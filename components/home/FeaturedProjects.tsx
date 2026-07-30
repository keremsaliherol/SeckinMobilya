"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { FadeInLeft, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function FeaturedProjects() {
  const { t } = useLang();
  const projects = getFeaturedProjects().slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <FadeInLeft>
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-3 block">
              {t.projects.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {t.projects.heading}
            </h2>
          </FadeInLeft>
          <FadeIn delay={0.2}>
            <Link
              href="/projelerimiz"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              {t.projects.allLink} <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {projects.map((project, idx) => (
            <StaggerItem key={project.id} className="bg-background">
              <Link
                href={`/projelerimiz/${project.slug}`}
                className="group relative overflow-hidden block aspect-[3/4]"
              >
                {/* Image */}
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Persistent dark gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Overlay panel — slides up from bottom */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] bg-background/95 backdrop-blur-sm p-6 border-t border-primary/30">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3 block">
                    {project.categoryLabel}
                  </span>
                  <h3 className="font-heading font-semibold text-xl text-white leading-snug mb-4">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70 border-b border-white/20 pb-0.5 group-hover:text-white group-hover:border-white transition-colors duration-300">
                    {t.projects.inspect} <ArrowRight size={12} />
                  </span>
                </div>

                {/* Bottom persistent info (visible before hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-5 group-hover:opacity-0 transition-opacity duration-200">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-1 block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading font-semibold text-base text-white leading-snug">
                    {project.title}
                  </h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
