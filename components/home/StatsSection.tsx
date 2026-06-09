"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, target]);

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
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 50%, var(--accent) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[...stats].map((stat, i) => (
            <StaggerItem key={i}>
              <div className="text-center text-white">
                <div className="font-heading font-bold text-4xl md:text-5xl text-white mb-2">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/70 font-medium tracking-wide">
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
