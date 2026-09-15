"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

/**
 * Markalı 404 sayfası. Statik dışa aktarmada `out/404.html` olarak üretilir;
 * Cloudflare (`wrangler.jsonc` → not_found_handling) bulunamayan her adreste
 * bu sayfayı döndürür.
 */
export default function NotFound() {
  const { t } = useLang();
  const nf = t.notFound;

  return (
    <section className="flex min-h-[85dvh] items-center pb-20 pt-32">
      <div className="mx-auto grid w-full max-w-[88rem] items-center gap-12 px-5 sm:px-8 md:grid-cols-[auto_1fr] md:gap-20 lg:px-12">
        {/* Logodaki kapsül çerçeve, içinde "S" yerine 404 */}
        <div
          aria-hidden="true"
          className="relative mx-auto grid aspect-[400/772] h-64 place-items-center rounded-full border border-brand/60 md:mx-0 md:h-80"
        >
          <span className="font-heading text-6xl text-brand md:text-7xl">404</span>
          <span className="absolute left-0 top-[30%] h-px w-[38%] origin-left -rotate-45 bg-brand/40" />
          <span className="absolute bottom-[26%] right-0 h-px w-[38%] origin-right -rotate-45 bg-brand/40" />
        </div>

        <div className="max-w-xl">
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-foreground">
            {nf.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{nf.desc}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
            >
              {nf.home} <ArrowRight size={16} />
            </Link>
            <Link
              href="/projelerimiz"
              className="inline-flex h-12 items-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:border-primary active:scale-[0.98]"
            >
              {nf.projects}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
