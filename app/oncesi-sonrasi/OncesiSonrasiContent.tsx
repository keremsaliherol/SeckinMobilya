"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBeforeAfterProjects } from "@/data/projects";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  beforeLabel,
  afterLabel,
}: {
  beforeImage: string;
  afterImage: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden aspect-[4/3] border border-border select-none cursor-ew-resize"
      onMouseDown={(e) => {
        dragging.current = true;
        updatePosition(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) updatePosition(e.clientX);
      }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => {
        dragging.current = true;
        updatePosition(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (dragging.current) updatePosition(e.touches[0].clientX);
      }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <img
        src={afterImage}
        alt={`${title} - ${afterLabel}`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - ${beforeLabel}`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-px bg-primary"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background border border-primary flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L1 10L7 16" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 4L19 10L13 16" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <span className="bg-background/80 backdrop-blur-sm text-white/80 text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4">
        <span className="bg-primary text-background text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}

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
                  beforeImage={project.beforeImage!}
                  afterImage={project.afterImage!}
                  title={project.title}
                  beforeLabel={pg.before}
                  afterLabel={pg.after}
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
