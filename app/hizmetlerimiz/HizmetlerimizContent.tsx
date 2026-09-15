"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { FadeInUp } from "@/components/ui/animations";
import PageHeader from "@/components/ui/PageHeader";
import { useLang } from "@/contexts/LanguageContext";

export default function HizmetlerimizContent() {
  const { p } = useLang();
  const pg = p.hizmetlerimiz;

  return (
    <>
      <PageHeader eyebrow={pg.hero.badge} title={pg.hero.title} description={pg.hero.subtitle} />

      {/* Sayfa içi kısayollar */}
      <nav aria-label={pg.jumpLabel} className="mx-auto -mt-4 mb-8 max-w-[88rem] px-5 sm:px-8 lg:-mt-8 lg:px-12">
        <ul className="flex flex-wrap gap-2">
          {services.map((s, i) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex h-10 items-center rounded-full border border-border px-4 text-[13px] text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
              >
                {pg.services[i].title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-[88rem] px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
        {services.map((s, i) => {
          const metin = pg.services[i];
          const proje = projects.find((x) => x.slug === s.projeSlug);
          const ters = i % 2 === 1;

          return (
            <article
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-28 gap-10 border-t border-border py-16 first:border-t-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-24"
            >
              <FadeInUp
                className={`lg:col-span-5 ${ters ? "lg:col-start-8 lg:row-start-1" : "lg:col-start-1"}`}
              >
                {/* Kemerli ve düz çerçeve sırayla: logodaki kapsül motifi, tekrara düşmeden */}
                <div
                  className={`relative aspect-[4/5] overflow-hidden bg-surface ${ters ? "" : "rounded-t-full"}`}
                >
                  <img
                    src={s.image}
                    alt={proje ? `${metin.title}: ${proje.title}` : metin.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </FadeInUp>

              <FadeInUp
                delay={0.1}
                className={`lg:col-span-6 ${ters ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}
              >
                <h2 className="font-heading text-[clamp(2.25rem,3.8vw,3.5rem)] leading-[1.02] text-foreground">
                  {metin.title}
                </h2>
                <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">{metin.description}</p>

                <ul className="mt-8 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
                  {metin.subServices.map((alt) => (
                    <li key={alt} className="flex items-center gap-3 border-b border-border py-3 text-[15px] text-foreground">
                      <span aria-hidden="true" className="h-px w-3 shrink-0 bg-brand" />
                      {alt}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link
                    href="/iletisim"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
                  >
                    {pg.ctaBtn} <ArrowRight size={16} />
                  </Link>
                  {proje && (
                    <Link
                      href={`/projelerimiz/${proje.slug}`}
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
                    >
                      {pg.relatedProject}:
                      <span className="border-b border-foreground/25 pb-0.5 font-medium text-foreground transition-colors group-hover:border-brand group-hover:text-brand">
                        {proje.title}
                      </span>
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </FadeInUp>
            </article>
          );
        })}
      </div>
    </>
  );
}
