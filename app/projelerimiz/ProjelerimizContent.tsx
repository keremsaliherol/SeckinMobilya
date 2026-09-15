"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, getUsedCategories, type Project, type ProjectCategory } from "@/data/projects";
import { FadeInUp } from "@/components/ui/animations";
import PageHeader from "@/components/ui/PageHeader";
import { useLang } from "@/contexts/LanguageContext";
import { duyarli } from "@/lib/gorsel";

type Filtre = { label: string; value: "all" | ProjectCategory };

/**
 * Kart görsel oranları sırayla döner: tüm fotoğraflar 3:4 olsa da farklı
 * kırpmalar sütunlu ızgarada (masonry) düz bir tablo görüntüsünü kırar.
 */
const ORANLAR = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[5/6]"];

/** `oncelikli`: ilk ekranda görünen kartlar; tembel yüklenirse sayfanın en büyük görseli (LCP) gecikiyor. */
function ProjeKarti({
  project,
  kategori,
  oran,
  oncelikli,
}: {
  project: Project;
  kategori: string;
  oran: string;
  oncelikli: boolean;
}) {
  const { p } = useLang();
  const pg = p.projelerimiz;
  return (
    <Link href={`/projelerimiz/${project.slug}`} className="group block">
      <span className={`relative block overflow-hidden bg-surface ${oran}`}>
        <img
          {...duyarli(project.coverImage, "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw")}
          alt={project.title}
          loading={oncelikli ? "eager" : "lazy"}
          fetchPriority={oncelikli ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
          <span className="sr-only">{pg.inspect}</span>
        </span>
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className="font-heading text-[1.65rem] leading-tight text-foreground transition-colors group-hover:text-brand">
          {project.title}
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-muted">{kategori}</span>
      </span>
      <span className="mt-1 block text-sm tabular-nums text-muted">
        {[`${project.images.length} ${pg.imageCount}`, project.location, project.year].filter(Boolean).join(" · ")}
      </span>
    </Link>
  );
}

export default function ProjelerimizContent() {
  const { p } = useLang();
  const pg = p.projelerimiz;
  const tumFiltreler = pg.filters as unknown as Filtre[];

  // Yalnızca gerçekten projesi olan kategoriler gösterilir; tek kategori
  // varsa filtre çubuğu hiç çıkmaz.
  const kullanilan = getUsedCategories();
  const filtreler = tumFiltreler.filter((f) => f.value === "all" || kullanilan.has(f.value));
  const kategoriAdi = (c: ProjectCategory) => tumFiltreler.find((f) => f.value === c)?.label ?? c;

  const [etkin, setEtkin] = useState<Filtre["value"]>("all");
  const liste = etkin === "all" ? projects : projects.filter((proje) => proje.category === etkin);
  const sayi = (v: Filtre["value"]) =>
    v === "all" ? projects.length : projects.filter((proje) => proje.category === v).length;

  return (
    <>
      <PageHeader eyebrow={pg.badge} title={pg.title} description={pg.subtitle} />

      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 lg:mb-14">
            {filtreler.length >= 3 ? (
              <div role="group" aria-label={pg.filtersLabel} className="flex flex-wrap gap-2">
                {filtreler.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setEtkin(f.value)}
                    aria-pressed={etkin === f.value}
                    className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-[13px] font-medium transition-colors active:scale-[0.98] ${
                      etkin === f.value
                        ? "border-primary bg-primary text-on-ink"
                        : "border-border text-foreground/80 hover:border-primary hover:text-foreground"
                    }`}
                  >
                    {f.label}
                    <span className="tabular-nums opacity-60">{sayi(f.value)}</span>
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}
            <p className="text-sm tabular-nums text-muted" aria-live="polite">
              {liste.length} {pg.projectCount}
            </p>
          </div>

          {/* key: filtre değişince liste yeniden kurulur, kartlar yeniden belirir */}
          <div key={etkin} className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
            {liste.map((project, i) => (
              // İlk ekrandaki kartlar animasyonsuz: belirme animasyonu JS yüklenene kadar görseli
              // gizleyip sayfanın en büyük görselinin (LCP) görünmesini ~1–2 sn geciktiriyordu.
              i < 3 ? (
                <div key={project.slug} className="mb-12 break-inside-avoid">
                  <ProjeKarti project={project} kategori={kategoriAdi(project.category)} oran={ORANLAR[i % ORANLAR.length]} oncelikli />
                </div>
              ) : (
                <FadeInUp key={project.slug} delay={Math.min(i, 5) * 0.05} className="mb-12 break-inside-avoid">
                  <ProjeKarti project={project} kategori={kategoriAdi(project.category)} oran={ORANLAR[i % ORANLAR.length]} oncelikli={false} />
                </FadeInUp>
              )
            ))}
          </div>

          {liste.length === 0 && <p className="py-20 text-center text-muted">{pg.empty}</p>}
        </div>
      </section>
    </>
  );
}
