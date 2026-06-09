"use client";
import { Award, Users, Clock, CheckCircle } from "lucide-react";
import { FadeInUp, FadeInLeft, FadeInRight, RevealImage, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

const valueIcons = [Award, Users, Clock, CheckCircle];
const memberImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
];

export default function HakkimizdaContent() {
  const { p } = useLang();
  const pg = p.hakkimizda;

  return (
    <>
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="max-w-2xl">
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-3 block">
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
              <RevealImage className="overflow-hidden rounded-2xl aspect-[4/3]">
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

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-3 block">
              {pg.values.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{pg.values.heading}</h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pg.values.items.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <StaggerItem key={i}>
                  <div className="bg-white rounded-xl p-8 border border-border text-center h-full hover:shadow-md transition-shadow duration-300">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealImage className="overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                alt="Mission & Vision"
                className="w-full h-full object-cover"
              />
            </RevealImage>
            <FadeInRight className="flex flex-col gap-10">
              <div>
                <div className="w-10 h-1 bg-primary rounded mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{pg.mission.heading}</h3>
                <p className="text-muted text-base leading-relaxed">{pg.mission.text}</p>
              </div>
              <div>
                <div className="w-10 h-1 bg-accent rounded mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">{pg.vision.heading}</h3>
                <p className="text-muted text-base leading-relaxed">{pg.vision.text}</p>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-3 block">
              {pg.team.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{pg.team.heading}</h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pg.team.members.map((member, i) => (
              <StaggerItem key={i}>
                <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                  <img
                    src={memberImages[i]}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-heading font-bold text-white text-base">{member.name}</p>
                    <p className="text-white/70 text-xs mt-1">{member.role}</p>
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
