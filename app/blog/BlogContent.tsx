"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGorunenYazilar } from "@/data/blog";
import { FadeInUp } from "@/components/ui/animations";
import PageHeader from "@/components/ui/PageHeader";
import BlogKarti from "@/components/blog/BlogKarti";
import { useLang } from "@/contexts/LanguageContext";

const yazilar = getGorunenYazilar();

export default function BlogContent() {
  const { p } = useLang();
  const b = p.blog;
  const [ilk, ...digerleri] = yazilar;

  return (
    <>
      <PageHeader eyebrow={b.badge} title={b.title} description={b.subtitle} />

      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          {ilk ? (
            <>
              {/* İlk (büyük) kart animasyonsuz: sayfanın en büyük görseli, gecikmeden görünsün */}
              <div className="mb-16 lg:mb-24">
                <BlogKarti yazi={ilk} buyuk />
              </div>

              {digerleri.length > 0 && (
                <ul className="grid gap-x-6 gap-y-16 border-t border-border pt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:pt-20">
                  {digerleri.map((yazi, i) => (
                    <li key={yazi.slug}>
                      <FadeInUp delay={Math.min(i, 5) * 0.06}>
                        <BlogKarti yazi={yazi} />
                      </FadeInUp>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <FadeInUp className="flex flex-col items-start gap-6 py-10 lg:py-16">
              <p className="font-heading text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] text-foreground">
                {b.empty}
              </p>
              <p className="max-w-[48ch] text-lg leading-relaxed text-muted">{b.emptyDesc}</p>
              <Link
                href="/projelerimiz"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
              >
                {b.emptyCta} <ArrowRight size={16} />
              </Link>
            </FadeInUp>
          )}
        </div>
      </section>
    </>
  );
}
