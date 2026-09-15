"use client";
import { FadeInUp, FadeInLeft, FadeInRight, RevealImage, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function HakkimizdaContent() {
  const { p } = useLang();
  const pg = p.hakkimizda;

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
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">{pg.story.heading}</h2>
              <div className="flex flex-col gap-4 text-muted text-base leading-relaxed">
                <p>{pg.story.p1}</p>
                <p>{pg.story.p2}</p>
                <p>{pg.story.p3}</p>
              </div>
            </FadeInLeft>
            <div className="relative">
              <RevealImage className="overflow-hidden aspect-[4/3] border border-border">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                  alt="Seçkin Mobilya atölye"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </RevealImage>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="mb-16 max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
              <span className="w-10 h-px bg-primary" />
              {pg.values.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{pg.values.heading}</h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {pg.values.items.map((value, i) => (
              <StaggerItem key={i}>
                <div className="h-full border-t border-border pt-8 pb-2 lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:border-l lg:first:border-l-0 lg:border-t-0 lg:pt-0">
                  <span className="font-heading text-sm text-primary tracking-widest mb-6 block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealImage className="overflow-hidden aspect-[4/3] border border-border">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                alt="Mission & Vision"
                className="w-full h-full object-cover"
              />
            </RevealImage>
            <FadeInRight className="flex flex-col gap-10">
              <div>
                <div className="w-10 h-px bg-primary mb-5" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{pg.mission.heading}</h3>
                <p className="text-muted text-base leading-relaxed">{pg.mission.text}</p>
              </div>
              <div>
                <div className="w-10 h-px bg-primary/50 mb-5" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{pg.vision.heading}</h3>
                <p className="text-muted text-base leading-relaxed">{pg.vision.text}</p>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

    </>
  );
}
