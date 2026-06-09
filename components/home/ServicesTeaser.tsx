"use client";
import Link from "next/link";
import { Armchair, HardHat, Ruler, ArrowRight } from "lucide-react";
import { FadeInLeft, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

const serviceIcons = [Armchair, HardHat, Ruler];
const serviceColors = ["bg-primary/10 text-primary", "bg-accent/10 text-accent", "bg-primary/10 text-primary"];

export default function ServicesTeaser() {
  const { t } = useLang();
  const services = t.services.items.map((item, i) => ({
    ...item,
    icon: serviceIcons[i],
    color: serviceColors[i],
    href: "/hizmetlerimiz",
  }));
  return (
    <section id="content" className="py-20 lg:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <FadeInLeft>
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-3 block">
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={i}>
                <Link
                  href={service.href}
                  className="group bg-white rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 block h-full"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${service.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <span className="flex items-center gap-2 text-xs font-medium text-primary group-hover:gap-3 transition-all">
                    {t.services.detail} <ArrowRight size={14} />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
