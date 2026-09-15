"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { projects, getUsedCategories, ProjectCategory } from "@/data/projects";
import { FadeInUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function ProjelerimizContent() {
  const { p } = useLang();
  const pg = p.projelerimiz;
  const tumFiltreler = pg.filters as unknown as {
    label: string;
    value: "all" | ProjectCategory;
  }[];

  // Yalnızca gerçekten projesi olan kategoriler gösterilir; tek kategori
  // varsa filtre çubuğu hiç çıkmaz.
  const kullanilan = getUsedCategories();
  const filters = tumFiltreler.filter(
    (f) => f.value === "all" || kullanilan.has(f.value)
  );

  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
                <span className="w-10 h-px bg-primary" />
                {pg.badge}
              </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {pg.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              {pg.subtitle}
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn
            className={`flex flex-wrap gap-3 mb-12 ${
              filters.length < 3 ? "hidden" : ""
            }`}
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                aria-pressed={active === f.value}
                className={`px-6 py-2.5 text-xs font-medium tracking-[0.12em] uppercase transition-colors border ${
                  active === f.value
                    ? "bg-primary text-background border-primary"
                    : "bg-transparent text-muted border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </FadeIn>

          {/* key: filtre değişince liste yeniden kurulur, kartlar tekrar animasyonla girer */}
          <StaggerContainer
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  href={`/projelerimiz/${project.slug}`}
                  className="group relative overflow-hidden block border border-border hover:border-primary/50 transition-colors duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary mb-2 block">
                      {[project.categoryLabel, project.location].filter(Boolean).join(" · ")}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-white leading-snug mb-2">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {pg.inspect} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted">
              {pg.empty}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
