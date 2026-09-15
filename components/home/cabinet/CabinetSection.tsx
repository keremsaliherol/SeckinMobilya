"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useMediaQuery } from "@/components/ui/useMediaQuery";
import { asamaAdlari, dolapParcalari } from "@/data/cabinetParts";
import { CTA_ESIGI, etkinAsama, type EtkinAsama } from "./zamanlama";

const CabinetCanvas = dynamic(() => import("./CabinetCanvas"), { ssr: false });

/**
 * 3D sahneden alınmış görüntüler (public/anatomi/):
 * kapalı hâli tuval yüklenirken yer tutar, açık hâli WebGL olmayan
 * tarayıcılarda ve hareket azaltma tercihinde gösterilir.
 */
const GORSEL_KAPALI = "/anatomi/dolap-kapali.webp";
const GORSEL_ACIK = "/anatomi/dolap-acik.webp";

function webglVarMi() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Numaralı parça listesi. `asama` verilirse o aşamanın satırları vurgulanır. */
function ParcaListesi({ asama = "hepsi" }: { asama?: EtkinAsama }) {
  const { lang, t } = useLang();
  return (
    <ol aria-label={t.home.cabinet.partsLabel} className="flex flex-col">
      {dolapParcalari.map((parca) => {
        const vurgulu = asama === -1 || asama === "hepsi" || parca.asama === asama;
        return (
          <li
            key={parca.no}
            className={`grid grid-cols-[1.75rem_minmax(0,9.5rem)_1fr] items-baseline gap-x-3 border-t border-border py-2.5 text-sm transition-opacity duration-500 ${
              vurgulu ? "opacity-100" : "opacity-40"
            }`}
          >
            <span className="text-[11px] font-medium tabular-nums text-brand">
              {String(parca.no).padStart(2, "0")}
            </span>
            <span className="font-medium text-foreground">{parca.ad[lang]}</span>
            <span className="text-[13px] leading-snug text-muted">{parca.malzeme[lang]}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default function CabinetSection() {
  const azHareket = useMediaQuery("(prefers-reduced-motion: reduce)");
  return azHareket ? <DolapSabit /> : <DolapKaydirma />;
}

/**
 * "Bir dolabın anatomisi": bölüm ekrana sabitlenir, kaydırdıkça 3D dolap
 * dört aşamada parçalarına ayrılır, bir süre açık kalır ve yeniden toplanır.
 *
 * Yükleme: three.js ağır bir paket (~250 KB). Tuval ancak bölüme bir ekran
 * boyu kala indirilir. Tarayıcıda WebGL yoksa aynı sahneden alınmış sabit
 * görüntü gösterilir. Tuval hazır olana kadar da bu görüntü yerinde durur.
 */
function DolapKaydirma() {
  const { lang, t } = useLang();
  const c = t.home.cabinet;
  const bolumRef = useRef<HTMLElement>(null);
  const [mod, setMod] = useState<"bekliyor" | "3d" | "sabit">("bekliyor");
  const [hazir, setHazir] = useState(false);
  const [asama, setAsama] = useState<EtkinAsama>(-1);
  const [bitti, setBitti] = useState(false);

  const { scrollYProgress } = useScroll({
    target: bolumRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const bolum = bolumRef.current;
    if (!bolum || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([giris]) => {
        if (!giris.isIntersecting) return;
        io.disconnect();
        setMod(webglVarMi() ? "3d" : "sabit");
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(bolum);
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const a = etkinAsama(v);
    setAsama((onceki) => (onceki === a ? onceki : a));
    const b = v > CTA_ESIGI;
    setBitti((onceki) => (onceki === b ? onceki : b));
  });

  const gorselGoster = mod !== "3d" || !hazir;

  return (
    <section ref={bolumRef} aria-labelledby="dolap-baslik" className="relative h-[440vh] lg:h-[520vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="mx-auto flex h-full max-w-[88rem] flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-20">
          {/* Başlık + liste (masaüstü) / yalnız başlık (mobil) */}
          <div className="px-5 pt-24 sm:px-8 lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:px-0 lg:pt-0">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-muted lg:mb-5">
              {c.eyebrow}
            </p>
            <h2
              id="dolap-baslik"
              className="font-heading text-[clamp(2rem,4vw,3.75rem)] leading-[1.02] text-foreground"
            >
              {c.title}
            </h2>
            <p className="mt-5 hidden max-w-[42ch] leading-relaxed text-muted lg:block">{c.desc}</p>
            <div className="mt-8 hidden lg:block">
              <ParcaListesi asama={asama} />
              <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted">
                {c.note}
              </p>
            </div>
          </div>

          {/* Sahne */}
          <div className="relative min-h-0 flex-1 lg:col-span-7 lg:h-full">
            {gorselGoster && (
              <img
                src={mod === "sabit" ? GORSEL_ACIK : GORSEL_KAPALI}
                alt={mod === "sabit" ? c.imageAlt : ""}
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
            {mod === "3d" && (
              <div aria-hidden="true" className="absolute inset-0">
                <CabinetCanvas ilerleme={scrollYProgress} onHazir={() => setHazir(true)} />
              </div>
            )}

            {/* Son: çağrı */}
            <div
              className={`absolute inset-x-5 bottom-6 flex flex-col items-start gap-4 transition-[opacity,transform] duration-500 sm:inset-x-8 lg:inset-x-auto lg:bottom-28 lg:right-4 lg:items-end lg:text-right ${
                bitti ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <p className="max-w-[20ch] font-heading text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05] text-foreground">
                {c.ctaTitle}
              </p>
              <Link
                href="/iletisim"
                tabIndex={bitti ? 0 : -1}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
              >
                {c.ctaButton} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Mobil: etkin aşamanın parçaları. Sabit yükseklik: içerik aşamaya göre
              değişince sahnenin boyu (ve dolabın ekrandaki büyüklüğü) oynamasın. */}
          <div
            className={`h-60 shrink-0 overflow-hidden px-5 pb-24 pt-2 transition-opacity duration-500 sm:px-8 lg:hidden ${
              bitti ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-brand">
              {asama === -1 || asama === "hepsi" ? c.partsLabel : asamaAdlari[asama][lang]}
            </p>
            {asama === -1 ? (
              <p className="max-w-[40ch] text-[15px] leading-relaxed text-muted">{c.desc}</p>
            ) : asama === "hepsi" ? (
              <ol className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[13px] leading-snug">
                {dolapParcalari.map((parca) => (
                  <li key={parca.no}>
                    <span className="mr-1.5 text-[11px] tabular-nums text-brand">
                      {String(parca.no).padStart(2, "0")}
                    </span>
                    <span className="text-foreground">{parca.ad[lang]}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="flex flex-col gap-1">
                {dolapParcalari
                  .filter((parca) => parca.asama === asama)
                  .map((parca) => (
                    <li key={parca.no} className="text-sm leading-snug">
                      <span className="mr-2 text-[11px] tabular-nums text-brand">
                        {String(parca.no).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-foreground">{parca.ad[lang]}</span>
                      <span className="text-muted"> — {parca.malzeme[lang]}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Hareket azaltma tercihinde: sabit görüntü + tam liste, sabitleme yok. */
function DolapSabit() {
  const { t } = useLang();
  const c = t.home.cabinet;

  return (
    <section aria-labelledby="dolap-baslik-sabit" className="py-24 lg:py-36">
      <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-5">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{c.eyebrow}</p>
          <h2
            id="dolap-baslik-sabit"
            className="font-heading text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] text-foreground"
          >
            {c.title}
          </h2>
          <div className="mt-8">
            <ParcaListesi />
            <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted">{c.note}</p>
          </div>
          <Link
            href="/iletisim"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light"
          >
            {c.ctaButton} <ArrowRight size={16} />
          </Link>
        </div>
        <img
          src={GORSEL_ACIK}
          alt={c.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full lg:col-span-7"
        />
      </div>
    </section>
  );
}
