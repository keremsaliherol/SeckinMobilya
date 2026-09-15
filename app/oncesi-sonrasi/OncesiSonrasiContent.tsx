"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBeforeAfterProjects } from "@/data/projects";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

export default function OncesiSonrasiContent() {
  const { p } = useLang();
  const pg = p.oncesiSonrasi;
  const projects = getBeforeAfterProjects();

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
          {projects.length === 0 && (
            <FadeInUp className="border border-border bg-surface py-20 px-8 text-center">
              <p className="text-muted text-base mb-8">{pg.empty}</p>
              <Link
                href="/projelerimiz"
                className="inline-flex items-center gap-2 bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
              >
                {pg.emptyCta} <ArrowRight size={16} />
              </Link>
            </FadeInUp>
          )}

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <BeforeAfterSlider
                  before={{ src: project.beforeImage!, alt: `${project.title} - ${pg.before}` }}
                  after={{ src: project.afterImage!, alt: `${project.title} - ${pg.after}` }}
                  beforeLabel={pg.before}
                  afterLabel={pg.after}
                  handleLabel={pg.title}
                  className="aspect-[4/3]"
                />
                <div className="mt-4">
                  <span className="text-xs font-medium tracking-widest uppercase text-muted mb-1 block">
                    {[project.categoryLabel, project.location].filter(Boolean).join(" · ")}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-lg text-foreground">
                      {project.title}
                    </h3>
                    <Link
                      href={`/projelerimiz/${project.slug}`}
                      className="flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all"
                    >
                      {pg.inspect} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
