"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { FadeInUp, FadeInLeft, FadeInRight, RevealImage, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function HizmetlerimizContent() {
  const { p } = useLang();
  const pg = p.hizmetlerimiz;

  return (
    <>
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
                <span className="w-10 h-px bg-primary" />
                {pg.hero.badge}
              </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {pg.hero.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed">{pg.hero.subtitle}</p>
          </FadeInUp>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-24">
          {services.map((service, i) => {
            const isReversed = i % 2 !== 0;
            const TextBlock = isReversed ? FadeInRight : FadeInLeft;
            const ImgBlock = isReversed ? FadeInLeft : FadeInRight;
            const ts = pg.services[i];
            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${isReversed ? "lg:grid-flow-dense" : ""}`}
              >
                <TextBlock className={isReversed ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-heading text-sm text-primary tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-4">{ts.title}</h2>
                  <p className="text-muted text-base leading-relaxed mb-8">{ts.description}</p>
                  <StaggerContainer className="flex flex-col gap-3 mb-10">
                    {[...ts.subServices].map((sub, j) => (
                      <StaggerItem key={j}>
                        <div className="flex items-center gap-4">
                          <span className="font-heading font-bold text-2xl text-primary/40 leading-none w-8 shrink-0">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-foreground border-b border-border pb-2 flex-1">{sub}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
                  >
                    {pg.ctaBtn} <ArrowRight size={16} />
                  </Link>
                </TextBlock>
                <ImgBlock className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <RevealImage className="overflow-hidden aspect-[4/3] border border-border">
                    <img
                      src={service.image}
                      alt={ts.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </RevealImage>
                </ImgBlock>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScaleIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{pg.bottomHeading}</h2>
            <p className="text-muted text-base mb-8 max-w-xl mx-auto">{pg.bottomDesc}</p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
            >
              {pg.bottomBtn} <ArrowRight size={16} />
            </Link>
          </ScaleIn>
        </div>
      </section>
    </>
  );
}
