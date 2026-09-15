"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInLeft, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function ServicesTeaser() {
  const { t } = useLang();
  const services = t.services.items;

  return (
    <section id="content" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <FadeInLeft>
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
              <span className="w-10 h-px bg-primary" />
              {t.services.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {t.services.heading}
            </h2>
          </FadeInLeft>
          <FadeIn delay={0.2}>
            <Link
              href="/hizmetlerimiz"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              {t.services.allLink} <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={i}>
              <Link
                href="/hizmetlerimiz"
                className="group flex flex-col h-full border-t border-border pt-8 pb-2 md:px-8 md:first:pl-0 md:last:pr-0 md:border-l md:first:border-l-0 md:border-t-0 md:pt-0 hover:border-primary/50 transition-colors duration-500"
              >
                <span className="font-heading text-sm text-primary tracking-widest mb-6 md:mt-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted group-hover:text-primary group-hover:gap-3 transition-all">
                  {t.services.detail} <ArrowRight size={14} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
