"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { projects, getProjectBySlug, type ProjectCategory } from "@/data/projects";
import { useLang } from "@/contexts/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { FadeInUp } from "@/components/ui/animations";
import Lightbox from "@/components/ui/Lightbox";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Galeri görsel oranları sırayla döner (sütunlu ızgarada ritim için). */
const ORANLAR = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[5/6]"];

export default function ProjeDetayContent({ slug }: { slug: string }) {
  const { p } = useLang();
  const d = p.projeDetay;
  const project = getProjectBySlug(slug)!;
  const [acikSira, setAcikSira] = useState<number | null>(null);

  const filtreler = p.projelerimiz.filters as unknown as { label: string; value: string }[];
  const kategoriAdi = (c: ProjectCategory) => filtreler.find((f) => f.value === c)?.label ?? c;
  const kategori = kategoriAdi(project.category);

  const sira = projects.findIndex((x) => x.slug === slug);
  const digerleri = [1, 2, 3].map((k) => projects[(sira + k) % projects.length]);

  type Satir = { etiket: string; deger: string };
  const kunye = (
    [
      { etiket: d.category, deger: kategori },
      project.location ? { etiket: d.location, deger: project.location } : null,
      project.year ? { etiket: d.year, deger: String(project.year) } : null,
      { etiket: d.images, deger: String(project.images.length) },
    ] as (Satir | null)[]
  ).filter((x): x is Satir => x !== null);

  return (
    <>
      {/* Üst: bilgi + kapak */}
      <section className="pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-12">
          <FadeInUp className="order-2 lg:order-1 lg:col-span-6 lg:pb-4">
            <Link
              href="/projelerimiz"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
            >
              <ArrowLeft size={16} /> {d.back}
            </Link>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{kategori}</p>
            <h1 className="font-heading text-[clamp(2.75rem,5.6vw,5.5rem)] leading-[0.98] tracking-[-0.015em] text-foreground">
              {project.title}
            </h1>
            <p className="mt-8 max-w-[56ch] text-lg leading-relaxed text-muted">{project.description}</p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
              {kunye.map((k) => (
                <div key={k.etiket}>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">{k.etiket}</dt>
                  <dd className="mt-1.5 font-heading text-2xl lining-nums tabular-nums text-foreground">{k.deger}</dd>
                </div>
              ))}
            </dl>
          </FadeInUp>

          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <button
              type="button"
              onClick={() => setAcikSira(0)}
              aria-label={`${d.zoom}: ${project.title}`}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-t-full bg-surface"
            >
              <img
                src={project.coverImage}
                alt={project.title}
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Galeri */}
      {project.images.length > 1 && (
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 flex items-baseline justify-between gap-6 border-t border-border pt-10">
              <h2 className="font-heading text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">{d.gallery}</h2>
              <span className="text-sm tabular-nums text-muted">
                {project.images.length} {p.projelerimiz.imageCount}
              </span>
            </div>
            <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-6">
              {project.images.slice(1).map((img, k) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setAcikSira(k + 1)}
                  aria-label={`${d.zoom} (${k + 2}/${project.images.length})`}
                  className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden bg-surface sm:mb-4 lg:mb-6 ${ORANLAR[k % ORANLAR.length]}`}
                >
                  <img
                    src={img}
                    alt={`${project.title}, ${k + 2}. görsel`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand size={15} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Öncesi / sonrası (varsa) */}
      {project.beforeImage && project.afterImage && (
        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
            <h2 className="mb-10 border-t border-border pt-10 font-heading text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">
              {d.beforeAfter}
            </h2>
            <BeforeAfterSlider
              before={{ src: project.beforeImage, alt: `${project.title}, ${d.before}` }}
              after={{ src: project.afterImage, alt: `${project.title}, ${d.after}` }}
              beforeLabel={d.before}
              afterLabel={d.after}
              handleLabel={d.beforeAfter}
              className="aspect-[4/3] w-full"
            />
          </div>
        </section>
      )}

      {/* Çağrı */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <FadeInUp className="grid gap-8 bg-surface px-6 py-12 sm:px-10 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-16 lg:py-16">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] text-foreground">
                {d.ctaTitle}
              </h2>
              <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-muted">{d.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <a
                href={whatsappLink(d.whatsappMessage.replace("{proje}", project.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
              >
                <WhatsAppIcon size={17} />
                {d.ctaWhatsapp}
              </a>
              <Link
                href="/iletisim"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary active:scale-[0.98]"
              >
                {d.ctaVisit} <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Diğer projeler */}
      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex items-baseline justify-between gap-6 border-t border-border pt-10">
            <h2 className="font-heading text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">{d.more}</h2>
            <Link
              href="/projelerimiz"
              className="inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              {d.back} <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {digerleri.map((x, k) => (
              <li key={x.slug}>
                <Link href={`/projelerimiz/${x.slug}`} className="group block">
                  <span className="relative block aspect-[4/5] overflow-hidden bg-surface">
                    <img
                      src={x.coverImage}
                      alt={x.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    {k === 0 && (
                      <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">
                        {d.next}
                      </span>
                    )}
                    <span className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-heading text-[1.65rem] leading-tight text-foreground transition-colors group-hover:text-brand">
                      {x.title}
                    </span>
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                      {kategoriAdi(x.category)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Lightbox
        images={project.images}
        index={acikSira}
        onClose={() => setAcikSira(null)}
        onIndexChange={setAcikSira}
        title={project.title}
      />
    </>
  );
}
