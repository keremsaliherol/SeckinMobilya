"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, ProjectCategory } from "@/data/projects";
import { FadeInUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function ProjelerimizPage() {
  const { p } = useLang();
  const pg = p.projelerimiz;
  const filters = pg.filters as unknown as { label: string; value: "all" | ProjectCategory }[];
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

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
          <FadeIn className="flex flex-wrap gap-3 mb-12">
            {filters.map((f) => (
              <motion.button
                key={f.value}
                onClick={() => setActive(f.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active === f.value
                    ? "bg-primary text-white"
                    : "bg-surface text-muted border border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <StaggerItem key={project.id}>
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 2, rotateX: -1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link
                    href={`/projelerimiz/${project.slug}`}
                    className="group relative overflow-hidden rounded-xl block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs font-medium tracking-widest uppercase text-white/70 mb-2 block">
                        {project.categoryLabel} · {project.location}
                      </span>
                      <h3 className="font-heading font-semibold text-lg text-white leading-snug mb-2">
                        {project.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-white/80 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {pg.inspect} <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
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
