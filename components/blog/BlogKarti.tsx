"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { okumaSuresi, tarihBicimle, type BlogYazisi } from "@/data/blog";
import { useLang } from "@/contexts/LanguageContext";
import { duyarli } from "@/lib/gorsel";

/**
 * Yazı kartı: kapak, tarih ve okuma süresi, başlık, özet.
 * Proje kartlarıyla aynı dil — yazı fotoğrafın altında, fotoğraf üstünde metin yok.
 *
 * `buyuk`: listenin ilk yazısı; masaüstünde fotoğraf solda, metin sağda.
 */
export default function BlogKarti({
  yazi,
  buyuk = false,
  baslikSeviyesi: Baslik = "h2",
}: {
  yazi: BlogYazisi;
  buyuk?: boolean;
  baslikSeviyesi?: "h2" | "h3";
}) {
  const { p } = useLang();
  const b = p.blog;
  const bilgi = `${tarihBicimle(yazi.tarih, b.dateLocale)} · ${b.readingTime.replace("{n}", String(okumaSuresi(yazi)))}`;

  return (
    <Link
      href={`/blog/${yazi.slug}`}
      className={`group block ${buyuk ? "lg:grid lg:grid-cols-12 lg:items-end lg:gap-8" : ""}`}
    >
      <span
        className={`relative block overflow-hidden bg-surface ${
          buyuk ? "aspect-[4/5] sm:aspect-[3/2] lg:col-span-7 lg:aspect-[4/3]" : "aspect-[4/5]"
        }`}
      >
        <img
          {...duyarli(yazi.kapak, buyuk ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw")}
          alt={yazi.kapakAlt}
          loading={buyuk ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {yazi.taslak && (
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">
            {b.draft}
          </span>
        )}
      </span>

      <div className={buyuk ? "mt-6 lg:col-span-5 lg:mt-0 lg:pb-2" : "mt-5"}>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">{bilgi}</p>
        <Baslik
          lang="tr"
          className={`mt-3 font-heading leading-[1.08] text-foreground transition-colors group-hover:text-brand ${
            buyuk ? "text-[clamp(2rem,3.6vw,3.25rem)]" : "text-[1.75rem]"
          }`}
        >
          {yazi.baslik}
        </Baslik>
        <p lang="tr" className={`mt-3 leading-relaxed text-muted ${buyuk ? "max-w-[46ch] text-lg" : "line-clamp-3"}`}>{yazi.ozet}</p>
        <span className="mt-5 inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors group-hover:border-brand group-hover:text-brand">
          {b.readMore} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
