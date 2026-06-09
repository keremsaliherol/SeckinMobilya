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
      className="relative overflow-hidden rounded-xl aspect-[4/3] select-none cursor-ew-resize"
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
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L1 10L7 16" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 4L19 10L13 16" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <span className="bg-black/50 text-white text-xs font-medium px-3 py-1.5 rounded">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4">
        <span className="bg-primary/80 text-white text-xs font-medium px-3 py-1.5 rounded">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}

export default function OncesiSonrasiPage() {
  const { p } = useLang();
  const pg = p.oncesiSonrasi;
  const projects = getBeforeAfterProjects();

  return (
    <>
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="max-w-2xl">
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-3 block">
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
                    {project.categoryLabel} · {project.location}
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
