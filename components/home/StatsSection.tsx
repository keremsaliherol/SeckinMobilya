"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, gorunur, zorla } = useReveal<HTMLSpanElement>();

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

  // Sayaç zamanlayıcısı çalışmazsa bile son değer görünür.
  const deger = zorla ? target : count;

  return (
    // lining-nums: Cormorant'ın varsayılan eski stil rakamlarında "100" "IOO" gibi okunuyordu.
    <span ref={ref} className="lining-nums tabular-nums">
      {deger}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const { t } = useLang();

  return (
    <section className="pb-24 lg:pb-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <p className="mb-10 border-t border-border pt-10 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
          {t.home.stats.eyebrow}
        </p>
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {t.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-3 pr-4 ${
                i > 0 ? "lg:border-l lg:border-border lg:pl-8" : ""
              } ${i % 2 === 1 ? "border-l border-border pl-5 lg:pl-8" : ""}`}
            >
              <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </dt>
              <dd className="font-heading text-[clamp(3.5rem,6.5vw,6rem)] leading-none text-foreground">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
