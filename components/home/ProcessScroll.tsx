"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  transform,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { useMediaQuery } from "@/components/ui/useMediaQuery";

/** public/surec/kareler/001–096.webp — süreç videosundan 12 fps, 720×1280 */
const KARE_SAYISI = 96;
const kareYolu = (i: number) => `/surec/kareler/${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Kaydırma ilerlemesi → kare. Başta ve sonda kısa bir bekleme payı var:
 * bölüm sabitlendiği an çizim hemen değişmeye başlamaz, bitmiş mutfak da
 * bölümden çıkmadan önce bir süre ekranda kalır.
 */
const kareIlerlemesi = transform([0.04, 0.9], [0, KARE_SAYISI - 1]);

/**
 * Adımların başladığı ilerleme değerleri. Videodaki geçişlerle eşleşir:
 * kare 0–24 çizim, 24–56 renklenme (çizim gerçeğe dönüşüyor), 56–96
 * ışıkların yandığı bitmiş mutfak.
 */
const ADIM_BASLANGICI = [0, 0.27, 0.55];
const adimBul = (v: number) => (v < ADIM_BASLANGICI[1] ? 0 : v < ADIM_BASLANGICI[2] ? 1 : 2);

/**
 * Yükleme sırası: önce kaba aralıklarla (her 24. kare), sonra aradakiler.
 * Böylece kareler inerken bile kaydırma boyunca görüntü hep değişir;
 * eksik kare yerine en yakın yüklenmiş kare çizilir.
 */
function yuklemeSirasi(adim: number) {
  const sira: number[] = [];
  const eklendi = new Set<number>();
  for (const aralik of [24, 12, 6, 3, adim]) {
    for (let i = 0; i < KARE_SAYISI; i += Math.max(aralik, adim)) {
      if (i % adim !== 0 || eklendi.has(i)) continue;
      eklendi.add(i);
      sira.push(i);
    }
  }
  return sira;
}

export default function ProcessScroll() {
  const azHareket = useMediaQuery("(prefers-reduced-motion: reduce)");
  return azHareket ? <SurecSabit /> : <SurecKaydirma />;
}

/**
 * "Çizimden gerçeğe": bölüm ekrana sabitlenir, kaydırdıkça video kareleri
 * bir <canvas>'a çizilir.
 *
 * Neden <video> değil: `video.currentTime` ile ileri-geri sarmak özellikle
 * Safari'de takılıyor ve kare atlıyor. Hazır kareleri çizmek her tarayıcıda
 * akıcı. Kareler bölüme yaklaşınca inmeye başlar (sayfa açılışını
 * yavaşlatmaz); mobilde her ikinci kare yüklenir (veri tasarrufu).
 *
 * Görünürlük güvencesi: canvas'ın altında ilk kare normal bir <img> olarak
 * durur. Kareler hiç yüklenmese ya da çizim çalışmasa bile çizim görünür.
 */
function SurecKaydirma() {
  const { t } = useLang();
  const s = t.home.process;

  const bolumRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kareler = useRef<(HTMLImageElement | undefined)[]>([]);
  const hedefKare = useRef(0);
  const cizilenKare = useRef(-1);
  const rafId = useRef(0);
  const [adim, setAdim] = useState(0);

  const { scrollYProgress } = useScroll({
    target: bolumRef,
    offset: ["start start", "end end"],
  });
  const ray = useTransform(scrollYProgress, transform([0, 0.92], [0, 1]));

  const ciz = useCallback(() => {
    rafId.current = 0;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || canvas.width === 0) return;

    // Hedef kare henüz inmediyse en yakın yüklenmiş kareyi bul
    const liste = kareler.current;
    const hedef = hedefKare.current;
    let i = -1;
    for (let d = 0; d < KARE_SAYISI; d++) {
      if (liste[hedef - d]) { i = hedef - d; break; }
      if (liste[hedef + d]) { i = hedef + d; break; }
    }
    if (i < 0 || i === cizilenKare.current) return;

    const img = liste[i]!;
    const olcek = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * olcek;
    const h = img.naturalHeight * olcek;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    cizilenKare.current = i;
  }, []);

  const cizimIste = useCallback(() => {
    if (!rafId.current) rafId.current = requestAnimationFrame(ciz);
  }, [ciz]);

  // Canvas çözünürlüğü kutu boyuna ve ekran yoğunluğuna uyar (en fazla 2x).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const boyutla = () => {
      // Sayfa bölümün ortasında yenilenirse kaydırma olayı gelmeden doğru kare seçilsin
      hedefKare.current = Math.round(kareIlerlemesi(scrollYProgress.get()));
      const oran = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * oran);
      canvas.height = Math.round(canvas.clientHeight * oran);
      cizilenKare.current = -1; // boyut değişince canvas silinir, yeniden çiz
      cizimIste();
    };
    boyutla();
    const ro = new ResizeObserver(boyutla);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [cizimIste, scrollYProgress]);

  // Kareleri bölüme yaklaşınca yükle (bir ekran boyu önceden).
  useEffect(() => {
    const bolum = bolumRef.current;
    if (!bolum) return;
    let basladi = false;

    const yukle = () => {
      if (basladi) return;
      basladi = true;
      const adimAraligi = window.innerWidth < 768 ? 2 : 1;
      for (const i of yuklemeSirasi(adimAraligi)) {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          kareler.current[i] = img;
          // Yeni inen kare hedefe daha yakınsa ekrana yansıt
          if (Math.abs(i - hedefKare.current) < Math.abs(cizilenKare.current - hedefKare.current) || cizilenKare.current < 0) {
            cizilenKare.current = -1;
            cizimIste();
          }
        };
        img.src = kareYolu(i);
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      yukle();
      return;
    }
    const io = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          yukle();
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(bolum);
    return () => io.disconnect();
  }, [cizimIste]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const kare = Math.round(kareIlerlemesi(v));
    if (kare !== hedefKare.current) {
      hedefKare.current = kare;
      cizimIste();
    }
    const yeni = adimBul(v);
    setAdim((a) => (a === yeni ? a : yeni));
  });

  return (
    <section ref={bolumRef} aria-labelledby="surec-baslik" className="relative h-[360vh] lg:h-[420vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="mx-auto h-full max-w-[88rem] lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12 lg:pt-20">
          {/* Masaüstü: adımlar */}
          <div className="hidden lg:col-span-5 lg:block">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
              {s.eyebrow}
            </p>
            <h2
              id="surec-baslik"
              className="max-w-[18ch] font-heading text-[clamp(2.4rem,3.8vw,3.75rem)] leading-[1.02] text-foreground"
            >
              {s.title}
            </h2>

            <ol className="relative mt-12 flex flex-col gap-7 pl-9">
              <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-border">
                <motion.span style={{ scaleY: ray }} className="block h-full w-px origin-top bg-brand" />
              </span>
              {s.steps.map((st, i) => (
                <li
                  key={st.title}
                  aria-current={adim === i ? "step" : undefined}
                  className={`transition-opacity duration-500 ${adim === i ? "opacity-100" : "opacity-45"}`}
                >
                  <span
                    className={`text-[11px] font-medium tabular-nums tracking-[0.3em] transition-colors ${
                      adim === i ? "text-brand" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 font-heading text-[2.5rem] leading-none text-foreground">
                    {st.title}
                  </h3>
                  {/* Açıklama yalnızca etkin adımda açık: sütun ekrana sığsın diye.
                      grid-rows 0fr→1fr geçişi yüksekliği ölçmeden yumuşak açar. */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ${
                      adim === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="max-w-[40ch] overflow-hidden leading-relaxed text-muted">
                      <span className="block pt-3">{st.desc}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Kare: mobilde tam ekran, masaüstünde logodaki kapsül */}
          <div className="absolute inset-0 bg-surface lg:relative lg:inset-auto lg:col-span-5 lg:col-start-8 lg:mx-auto lg:aspect-[9/16] lg:h-[80dvh] lg:overflow-hidden lg:rounded-full">
            <img
              src={kareYolu(0)}
              alt={s.frameAlt}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
          </div>

          {/* Mobil: üstte bölüm adı, altta etkin adım */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-background/90 to-transparent lg:hidden"
          />
          <p className="absolute left-5 top-24 text-[11px] font-medium uppercase tracking-[0.3em] text-muted sm:left-8 lg:hidden">
            {s.eyebrow}
          </p>
          {/* pb-24: sağ alttaki sabit WhatsApp butonu metnin son satırını kapatmasın */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-shade/90 via-shade/50 to-transparent px-5 pb-24 pt-40 text-white sm:px-8 lg:hidden">
            <h2 className="sr-only">{s.title}</h2>
            <div aria-hidden="true" className="mb-6 flex gap-1.5">
              {s.steps.map((st, i) => (
                <span
                  key={st.title}
                  className={`h-0.5 flex-1 transition-colors duration-500 ${i <= adim ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
            <ol className="relative min-h-[10.5rem]">
              {s.steps.map((st, i) => (
                <li
                  key={st.title}
                  aria-hidden={adim !== i}
                  className={`absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-500 ${
                    adim === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  <span className="text-[11px] font-medium tabular-nums tracking-[0.3em] text-white/70">
                    {String(i + 1).padStart(2, "0")} / {String(s.steps.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-[2.5rem] leading-none">{st.title}</h3>
                  <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-white/85">{st.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hareket azaltma tercihinde: üç adım, videodan üç sabit kareyle yan yana. */
const SABIT_KARELER = [0, 40, 95];

function SurecSabit() {
  const { t } = useLang();
  const s = t.home.process;

  return (
    <section aria-labelledby="surec-baslik-sabit" className="py-24 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{s.eyebrow}</p>
        <h2
          id="surec-baslik-sabit"
          className="max-w-[18ch] font-heading text-[clamp(2.5rem,4.2vw,4rem)] leading-[1.02] text-foreground"
        >
          {s.title}
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {s.steps.map((st, i) => (
            <li key={st.title}>
              <img
                src={kareYolu(SABIT_KARELER[i])}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[9/13] w-full rounded-t-full object-cover"
              />
              <span className="mt-6 block text-[11px] font-medium tabular-nums tracking-[0.3em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 font-heading text-4xl text-foreground">{st.title}</h3>
              <p className="mt-3 max-w-[40ch] leading-relaxed text-muted">{st.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
