"use client";
import Link from "next/link";
import { Phone } from "lucide-react";
import { ScaleIn } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import { contact } from "@/lib/site";

export default function CtaBanner() {
  const { t } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden bg-surface border border-border py-16 px-8 md:px-16 text-center">
          {/* İnce bronz üst çizgi */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <ScaleIn className="relative z-10">
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-6">
              <span className="w-8 h-px bg-primary" />
              {t.cta.badge}
              <span className="w-8 h-px bg-primary" />
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5 leading-tight text-foreground">
              {t.cta.heading}
            </h2>
            <p className="text-muted text-base max-w-xl mx-auto mb-10 leading-relaxed">
              {t.cta.desc}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/iletisim"
                className="bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
              >
                {t.cta.btn1}
              </Link>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 border border-border text-foreground font-medium px-8 py-3.5 hover:border-primary hover:text-primary transition-colors"
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
