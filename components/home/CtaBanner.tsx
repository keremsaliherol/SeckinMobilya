"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { ScaleIn } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function CtaBanner() {
  const { t } = useLang();
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-2xl bg-accent text-white py-16 px-8 md:px-16 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" />

          <ScaleIn className="relative z-10">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-white/60 border border-white/20 px-3 py-1.5 rounded mb-6">
              {t.cta.badge}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {t.cta.heading}
            </h2>
            <p className="text-white/80 text-base max-w-xl mx-auto mb-10 leading-relaxed">
              {t.cta.desc}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/iletisim"
                className="bg-white text-accent font-semibold px-8 py-3.5 rounded hover:bg-white/90 transition-colors"
              >
                {t.cta.btn1}
              </Link>
              <a
                href="tel:+905001234567"
                className="flex items-center gap-2 border border-white/40 text-white font-medium px-8 py-3.5 rounded hover:bg-white/10 transition-colors"
              >
                <Phone size={16} />
                {t.cta.btn2}
              </a>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
