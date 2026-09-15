"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBeforeAfterProjects } from "@/data/projects";
import { FadeInUp } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import PageHeader from "@/components/ui/PageHeader";
import CompareSection from "@/components/home/CompareSection";

/**
 * Öncesi / sonrası.
 *
 * Üstte süreç videosundan çizim/uygulama karşılaştırması (ana sayfadaki
 * bölüm). Altta projelerin gerçek öncesi/sonrası fotoğrafları: bir projeye
 * data/projects.ts içinde `beforeImage` ve `afterImage` eklendiğinde burada
 * kendiliğinden görünür.
 */
export default function OncesiSonrasiContent() {
  const { p } = useLang();
  const pg = p.oncesiSonrasi;
  const projeler = getBeforeAfterProjects();

  return (
    <>
      <PageHeader eyebrow={pg.badge} title={pg.title} description={pg.subtitle} />

      <CompareSection />

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <h2 className="mb-10 font-heading text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">
            {pg.projectsTitle}
          </h2>

          {projeler.length === 0 ? (
            <FadeInUp className="flex flex-col items-start gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[46ch] text-lg leading-relaxed text-muted">{pg.empty}</p>
              <Link
                href="/projelerimiz"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary active:scale-[0.98]"
              >
                {pg.emptyCta} <ArrowRight size={16} />
              </Link>
            </FadeInUp>
          ) : (
            <ul className="grid gap-14 border-t border-border pt-10 md:grid-cols-2 md:gap-8">
              {projeler.map((proje) => (
                <li key={proje.slug}>
                  <FadeInUp>
                    <BeforeAfterSlider
                      before={{ src: proje.beforeImage!, alt: `${proje.title}, ${pg.before}` }}
                      after={{ src: proje.afterImage!, alt: `${proje.title}, ${pg.after}` }}
                      beforeLabel={pg.before}
                      afterLabel={pg.after}
                      handleLabel={proje.title}
                      className="aspect-[4/3] w-full"
                    />
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="font-heading text-[1.65rem] leading-tight text-foreground">{proje.title}</h3>
                      <Link
                        href={`/projelerimiz/${proje.slug}`}
                        className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
                      >
                        {pg.inspect} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </FadeInUp>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
