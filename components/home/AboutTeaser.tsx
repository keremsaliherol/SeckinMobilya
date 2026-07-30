"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { RevealImage, FadeInRight, FadeInLeft, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function AboutTeaser() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInLeft className="relative">
            <RevealImage className="relative overflow-hidden aspect-[4/3] border border-border">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                alt="Seçkin Mobilya atölye"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </RevealImage>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 overflow-hidden hidden lg:block border border-border">
              <img
                src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=400&q=80"
                alt="Detay"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-background border border-primary/40 flex-col items-center justify-center hidden lg:flex">
              <span className="font-heading font-bold text-3xl text-primary">50+</span>
              <span className="text-[10px] tracking-widest uppercase text-muted text-center leading-tight mt-1.5 px-2">
                {t.about.experience}
              </span>
            </div>
          </FadeInLeft>

          <FadeInRight>
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
              <span className="w-10 h-px bg-primary" />
              {t.about.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {t.about.heading.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              {t.about.p1}
            </p>
            <p className="text-muted text-base leading-relaxed mb-8">
              {t.about.p2}
            </p>

            <StaggerContainer className="flex flex-col gap-3 mb-10">
              {t.about.highlights.map((h, i) => (
                <StaggerItem key={i}>
                  <li className="flex items-center gap-3 list-none border-b border-border/60 pb-3">
                    <CheckCircle size={15} className="text-primary shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-foreground/90">{h}</span>
                  </li>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
            >
              {t.about.cta} <ArrowRight size={16} />
            </Link>
          </FadeInRight>
        </div>
      </div>
    </section>
  );
}
