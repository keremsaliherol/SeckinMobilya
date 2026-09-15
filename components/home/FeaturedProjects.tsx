"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, transform, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useLang } from "@/contexts/LanguageContext";

/** Şeritte gösterilecek projeler ve sırası (kapak fotoğrafı güçlü olanlar). */
const SECKI = [
  "basaksehir-misstanbul",
  "soyak-olympiakent",
  "daca-boutique",
  "mutfak-projelerimiz",
  "sefakoy",
  "bahcesehir-mutfak",
  "sariyer-cobanoglu",
];
const secki = SECKI.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is (typeof projects)[number] => Boolean(p)
);

function Baslik() {
  const { t } = useLang();
  const pr = t.home.projects;
  return (
    <div className="flex w-full shrink-0 flex-col justify-between gap-8 lg:h-full lg:w-[26rem] lg:py-2">
      <div>
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
          {pr.eyebrow}
        </p>
        <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] text-foreground">
          {pr.title}
        </h2>
        <p className="mt-6 max-w-[32ch] text-lg leading-relaxed text-muted">{pr.desc}</p>
      </div>
      <Link
        href="/projelerimiz"
        className="inline-flex items-center gap-2 self-start border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
      >
        {pr.all} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function ProjeKarti({ p, i }: { p: (typeof secki)[number]; i: number }) {
  return (
    <Link
      href={`/projelerimiz/${p.slug}`}
      // Tek/çift kartlar farklı yükseklikte: şerit düz bir sıra gibi durmaz.
      className={`group block w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[24rem] xl:w-[27rem] ${
        i % 2 === 1 ? "lg:mt-16" : ""
      }`}
    >
      <span
        className={`relative block overflow-hidden bg-surface ${
          i % 2 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"
        }`}
      >
        <img
          src={p.coverImage}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className="font-heading text-2xl leading-tight text-foreground transition-colors group-hover:text-brand">
          {p.title}
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
          {p.categoryLabel}
        </span>
      </span>
    </Link>
  );
}

function SonKart() {
  const { t } = useLang();
  return (
    <Link
      href="/projelerimiz"
      className="group flex aspect-[3/4] w-[60vw] shrink-0 snap-start flex-col items-center justify-center gap-6 rounded-t-full border border-border text-center transition-colors hover:border-primary hover:bg-primary hover:text-on-ink sm:w-[36vw] lg:w-[18rem]"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-current">
        <ArrowRight size={20} />
      </span>
      <span className="font-heading text-2xl">{t.home.projects.allCard}</span>
    </Link>
  );
}

/**
 * Projeler şeridi.
 *
 * Masaüstünde bölüm ekrana sabitlenir ve dikey kaydırma şeridi yatay
 * kaydırır. Bölüm yüksekliği şeridin taşan genişliği kadar uzatılır; böylece
 * kaydırma hızı sayfanın geri kalanıyla aynı hissettirir.
 *
 * Mobilde, dar ekranda ve hareket azaltma tercihinde sabitleme yoktur;
 * şerit parmakla yatay kaydırılan normal bir listedir. Sunucuda da bu hâl
 * üretilir, masaüstü davranışı tarayıcıda devreye girer.
 */
export default function FeaturedProjects() {
  const bolumRef = useRef<HTMLElement>(null);
  const seritRef = useRef<HTMLDivElement>(null);
  const [sabit, setSabit] = useState(false);
  const [mesafe, setMesafe] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    const guncelle = () => setSabit(mq.matches);
    guncelle();
    mq.addEventListener("change", guncelle);
    return () => mq.removeEventListener("change", guncelle);
  }, []);

  // Şerit genişliği sabit moda geçtikten sonra (farklı öğe) ve her yeniden
  // boyutlandırmada ölçülür.
  useEffect(() => {
    if (!sabit) return;
    const olc = () => {
      const s = seritRef.current;
      if (s) setMesafe(Math.max(0, s.scrollWidth - window.innerWidth));
    };
    olc();
    window.addEventListener("resize", olc);
    return () => window.removeEventListener("resize", olc);
  }, [sabit]);

  const { scrollYProgress } = useScroll({
    target: bolumRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, transform([0, 1], [0, -mesafe]));
  const ilerleme = useTransform(scrollYProgress, transform([0, 1], [0, 1]));

  const kartlar = (
    <>
      {secki.map((p, i) => (
        <ProjeKarti key={p.slug} p={p} i={i} />
      ))}
      <SonKart />
    </>
  );

  if (!sabit) {
    return (
      <section ref={bolumRef} className="py-24 lg:py-36">
        <div className="mx-auto mb-12 max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <Baslik />
        </div>
        <div className="flex snap-x snap-mandatory scroll-px-5 items-start gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:gap-8 lg:px-12 [&::-webkit-scrollbar]:hidden">
          {kartlar}
        </div>
      </section>
    );
  }

  return (
    <section ref={bolumRef} className="relative" style={{ height: `calc(100dvh + ${mesafe}px)` }}>
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-20">
        <motion.div
          ref={seritRef}
          style={{ x }}
          className="flex w-max items-start gap-8 px-12 will-change-transform xl:gap-10"
        >
          <Baslik />
          {kartlar}
        </motion.div>

        <div className="mx-12 mt-10 h-px bg-border">
          <motion.div style={{ scaleX: ilerleme }} className="h-px origin-left bg-brand" />
        </div>
      </div>
    </section>
  );
}
