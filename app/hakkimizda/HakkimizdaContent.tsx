"use client";

import { FadeInUp } from "@/components/ui/animations";
import PageHeader from "@/components/ui/PageHeader";
import StatsSection from "@/components/home/StatsSection";
import { useLang } from "@/contexts/LanguageContext";
import { duyarli } from "@/lib/gorsel";

/** Hikâye bölümündeki gerçek proje fotoğrafı (eski stok görselin yerine). */
const HIKAYE_GORSELI = "/projeler/basaksehir-misstanbul/04.jpg";

export default function HakkimizdaContent() {
  const { p } = useLang();
  const pg = p.hakkimizda;

  return (
    <>
      <PageHeader eyebrow={pg.hero.badge} title={pg.hero.title} description={pg.hero.subtitle} />

      {/* Hikâye */}
      <section className="pb-24 lg:pb-36">
        <div className="mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12">
          {/* İlk ekranda: animasyonsuz, sayfanın en büyük görseli (LCP) gecikmesin */}
          <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none">
            {/* Logodaki kapsül: fotoğraf kapsülün içinde */}
            <div className="relative aspect-[3/5] overflow-hidden rounded-full bg-surface">
              <img
                {...duyarli(HIKAYE_GORSELI, "(min-width: 1024px) 40vw, 26rem")}
                alt={pg.story.imageAlt}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-0 bg-background px-6 py-4 sm:-right-4 lg:-right-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted">{pg.story.since}</p>
              <p className="font-heading text-6xl leading-none text-brand">1975</p>
            </div>
          </div>

          <FadeInUp delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{pg.story.badge}</p>
            <h2 className="max-w-[16ch] font-heading text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] text-foreground">
              {pg.story.heading}
            </h2>
            <div className="mt-8 flex max-w-[58ch] flex-col gap-5 text-lg leading-relaxed text-muted">
              <p>{pg.story.p1}</p>
              <p>{pg.story.p2}</p>
              <p>{pg.story.p3}</p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Değerler */}
      <section className="bg-surface py-24 lg:py-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <FadeInUp className="mb-12 lg:mb-16">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{pg.values.badge}</p>
            <h2 className="font-heading text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] text-foreground">
              {pg.values.heading}
            </h2>
          </FadeInUp>
          <ul className="grid border-t border-foreground/15 sm:grid-cols-2">
            {pg.values.items.map((deger, i) => (
              <li
                key={deger.title}
                className={`border-b border-foreground/15 py-10 sm:px-10 lg:py-14 ${
                  i % 2 === 0 ? "sm:pl-0" : "sm:border-l sm:pr-0"
                }`}
              >
                <FadeInUp delay={i * 0.05}>
                  <h3 className="font-heading text-[clamp(2rem,3vw,2.75rem)] leading-none text-foreground">
                    {deger.title}
                  </h3>
                  <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-muted">{deger.description}</p>
                </FadeInUp>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rakamlar (ana sayfadaki bölüm) */}
      <div className="pt-24 lg:pt-36">
        <StatsSection />
      </div>

      {/* Misyon ve vizyon */}
      <section className="pb-24 lg:pb-36">
        <div className="mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
          {[pg.mission, pg.vision].map((blok, i) => (
            <FadeInUp key={blok.heading} delay={i * 0.1} className="border-t border-border pt-10">
              <h2 className="mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-brand">
                {blok.heading}
              </h2>
              <p className="font-heading text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.2] text-foreground">
                {blok.text}
              </p>
            </FadeInUp>
          ))}
        </div>
      </section>
    </>
  );
}
