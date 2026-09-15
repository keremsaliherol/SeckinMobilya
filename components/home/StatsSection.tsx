"use client";

import { useEffect, useState } from "react";
import { StaggerContainer, StaggerItem, useReveal } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, gorunur } = useReveal<HTMLSpanElement>();

  useEffect(() => {
    if (!gorunur) return;

    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);
    return () => clearInterval(timer);
  }, [gorunur, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useLang();
  const stats = t.stats;
  return (
    <section className="py-20 relative overflow-hidden bg-surface border-y border-border">
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(198,161,91,0.25) 40px, rgba(198,161,91,0.25) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(198,161,91,0.25) 40px, rgba(198,161,91,0.25) 41px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4">
          {[...stats].map((stat, i) => (
            <StaggerItem key={i}>
              <div className="text-center md:border-l md:border-border md:first:border-l-0 md:px-4">
                <div className="font-heading font-bold text-4xl md:text-5xl text-primary mb-3">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted font-medium tracking-[0.15em] uppercase">
                  {stat.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
