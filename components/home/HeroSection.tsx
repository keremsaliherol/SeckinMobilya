"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import { motion, transform, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

/**
 * Ana sayfa açılışı: logodaki kapsül, projelere açılan bir pencere.
 *
 * İlk ekranda fotoğraf logodaki gibi bir kapsülün içinde durur. Ziyaretçi
 * kaydırdıkça kapsül ekranı kaplayana kadar büyür, başlık çekilir ve
 * fotoğrafın üstünde ikinci bir cümle belirir.
 *
 * Kapsülün ölçüleri CSS'te (`.hero-kapsul`, globals.css) ekran boyuna göre
 * tanımlıdır; buradan yalnızca 0→1 arası `--acilma` değeri gönderilir. Böylece
 * masaüstü/mobil ayrımı için JS'te ekran ölçmeye gerek kalmaz.
 *
 * Görünürlük güvencesi: başlık ve butonlar opaklık 1 ile başlar, yalnızca
 * kaydırdıkça silikleşir. Hareket azaltma tercihinde (CSS) kapsül sabit kalır
 * ve bölüm tek ekran yüksekliğine iner.
 */
export default function HeroSection() {
  const { t } = useLang();
  const h = t.home.hero;
  const bolumRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: bolumRef,
    offset: ["start start", "end end"],
  });

  const acilma = useTransform(scrollYProgress, transform([0.02, 0.6], [0, 1]));
  const gorselOlcek = useTransform(scrollYProgress, transform([0, 0.6], [1.14, 1]));
  const metinOpak = useTransform(scrollYProgress, transform([0, 0.2], [1, 0]));
  const metinY = useTransform(scrollYProgress, transform([0, 0.2], [0, -70]));
  const perde = useTransform(scrollYProgress, transform([0.38, 0.66], [0, 1]));
  const ustYaziOpak = useTransform(scrollYProgress, transform([0.6, 0.78], [0, 1]));
  const ustYaziY = useTransform(scrollYProgress, transform([0.6, 0.78], [36, 0]));

  return (
    <section ref={bolumRef} className="hero-bolum relative h-[250vh]">
      <motion.div
        className="hero-sahne sticky top-0 h-dvh overflow-hidden"
        style={{ "--acilma": acilma } as unknown as CSSProperties}
      >
        {/* Kapsül pencere: fotoğraf + karartma + ikinci cümle */}
        <div className="hero-kapsul absolute inset-0 bg-surface">
          <motion.img
            src="/hero/yatak-odasi.jpg"
            alt={h.imageAlt}
            fetchPriority="high"
            decoding="async"
            style={{ scale: gorselOlcek }}
            className="hero-gorsel absolute inset-0 h-full w-full object-cover"
          />
          <motion.div
            aria-hidden="true"
            style={{ opacity: perde }}
            className="hero-perde absolute inset-0 bg-gradient-to-t from-shade/80 via-shade/35 to-shade/10"
          />

          <motion.div
            style={{ opacity: ustYaziOpak, y: ustYaziY }}
            className="hero-ust-yazi absolute inset-x-0 bottom-0"
          >
            <div className="mx-auto flex max-w-[88rem] flex-col items-start gap-8 px-5 pb-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-20">
              <div className="max-w-3xl text-white">
                <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-accent-light">
                  {h.overlayEyebrow}
                </p>
                <p className="font-heading text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[1.02]">
                  {h.overlayTitle}
                </p>
              </div>
              <Link
                href="/projelerimiz"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-foreground transition-colors hover:bg-accent-light active:scale-[0.98]"
              >
                {h.cta1} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Logodaki çapraz çizgiler: kapsülün kenarını keser, açılınca çekilir */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: metinOpak }}
          className="hero-cizgi hero-cizgi-ust pointer-events-none absolute hidden h-px bg-brand/60 lg:block"
        />
        <motion.span
          aria-hidden="true"
          style={{ opacity: metinOpak }}
          className="hero-cizgi hero-cizgi-alt pointer-events-none absolute hidden h-px bg-brand/60 lg:block"
        />

        {/* Başlık bloğu */}
        <motion.div
          style={{ opacity: metinOpak, y: metinY }}
          className="hero-metin pointer-events-none absolute inset-x-0 top-0"
        >
          <div className="mx-auto max-w-[88rem] px-5 pt-28 sm:px-8 lg:flex lg:h-dvh lg:items-center lg:px-12 lg:pt-20">
            <div className="pointer-events-auto max-w-[36rem] xl:max-w-[42rem]">
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-muted lg:mb-8">
                {h.eyebrow}
              </p>
              <h1 className="font-heading text-[clamp(2.6rem,6.4vw,6.4rem)] leading-[0.95] tracking-[-0.015em] text-foreground">
                <span className="block">{h.title[0]}</span>
                <span className="block italic text-brand">{h.title[1]}</span>
              </h1>
              <p className="mt-7 hidden max-w-[30rem] text-lg leading-relaxed text-muted sm:block">
                {h.desc}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-10">
                <Link
                  href="/projelerimiz"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
                >
                  {h.cta1} <ArrowRight size={16} />
                </Link>
                <Link
                  href="/iletisim"
                  className="hidden h-12 items-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:border-primary active:scale-[0.98] sm:inline-flex"
                >
                  {h.cta2}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kaydırma ipucu */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: metinOpak }}
          className="hero-ipucu absolute bottom-8 left-5 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted sm:left-8 lg:left-12 lg:flex"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-border">
            <span className="hero-ipucu-cizgi absolute inset-x-0 top-0 h-1/2 bg-brand" />
          </span>
          {h.scroll}
        </motion.div>
      </motion.div>
    </section>
  );
}
