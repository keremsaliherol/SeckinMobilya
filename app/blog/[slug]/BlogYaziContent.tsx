"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  baslikKimligi,
  getGorunenYazilar,
  getYaziBySlug,
  okumaSuresi,
  tarihBicimle,
  type BlogBolumu,
} from "@/data/blog";
import { getProjectBySlug } from "@/data/projects";
import { useLang } from "@/contexts/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { FadeInUp } from "@/components/ui/animations";
import BlogKarti from "@/components/blog/BlogKarti";
import { WhatsAppIcon } from "@/components/ui/icons";

/** "Yüzey: Akrilik düz…" → etiket kalın yazılır. Etiket kısa değilse madde düz kalır. */
function Madde({ metin }: { metin: string }) {
  const ayrac = metin.indexOf(": ");
  if (ayrac < 1 || ayrac > 32) return <>{metin}</>;
  return (
    <>
      <strong className="font-medium text-foreground">{metin.slice(0, ayrac)}:</strong>
      {metin.slice(ayrac + 1)}
    </>
  );
}

function Bolum({ bolum, ilk }: { bolum: BlogBolumu; ilk: boolean }) {
  const kimlik = bolum.baslik ? baslikKimligi(bolum.baslik) : undefined;
  return (
    <section aria-labelledby={kimlik} className={ilk ? "" : "mt-14 lg:mt-16"}>
      {bolum.baslik && (
        <h2
          id={kimlik}
          className="mb-5 scroll-mt-28 font-heading text-[clamp(1.9rem,2.8vw,2.5rem)] leading-[1.1] text-foreground"
        >
          {bolum.baslik}
        </h2>
      )}
      <div className="space-y-5 text-[1.125rem] leading-[1.8] text-foreground/85">
        {bolum.paragraflar.map((paragraf) => (
          <p key={paragraf.slice(0, 40)}>{paragraf}</p>
        ))}
      </div>
      {bolum.liste && (
        <ul className="mt-6 space-y-4 text-[1.125rem] leading-[1.7] text-foreground/85">
          {bolum.liste.map((madde) => (
            <li key={madde.slice(0, 40)} className="flex gap-4">
              <span aria-hidden="true" className="mt-[0.85em] h-px w-4 shrink-0 bg-brand" />
              <span>
                <Madde metin={madde} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {bolum.gorsel && (
        <figure className="mt-8 max-w-[34rem]">
          <span className="relative block aspect-[4/5] overflow-hidden bg-surface">
            <img
              src={bolum.gorsel.src}
              alt={bolum.gorsel.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </span>
        </figure>
      )}
      {bolum.baglanti && (
        <Link
          href={bolum.baglanti.href}
          className="mt-7 inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-[15px] font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
        >
          {bolum.baglanti.metin} <ArrowRight size={15} />
        </Link>
      )}
    </section>
  );
}

export default function BlogYaziContent({ slug }: { slug: string }) {
  const { p } = useLang();
  const b = p.blog;
  const yazi = getYaziBySlug(slug)!;
  const proje = yazi.projeSlug ? getProjectBySlug(yazi.projeSlug) : undefined;

  const filtreler = p.projelerimiz.filters as unknown as { label: string; value: string }[];
  const kategori = proje ? (filtreler.find((f) => f.value === proje.category)?.label ?? proje.categoryLabel) : "";

  const basliklar = yazi.bolumler.flatMap((x) => (x.baslik ? [x.baslik] : []));
  const digerleri = getGorunenYazilar()
    .filter((y) => y.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Üst: başlık + kemerli kapak */}
      <section className="pb-14 pt-28 lg:pb-20 lg:pt-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          {yazi.taslak && (
            <p className="mb-10 flex flex-wrap items-center gap-3 border border-dashed border-brand/50 px-4 py-3 text-sm text-muted">
              <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-on-ink">
                {b.draft}
              </span>
              {b.draftNote}
            </p>
          )}

          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <FadeInUp className="lg:col-span-7 lg:pb-4">
              <Link
                href="/blog"
                className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
              >
                <ArrowLeft size={16} /> {b.back}
              </Link>
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
                <time dateTime={yazi.tarih}>{tarihBicimle(yazi.tarih, b.dateLocale)}</time>
                <span aria-hidden="true"> · </span>
                {b.readingTime.replace("{n}", String(okumaSuresi(yazi)))}
              </p>
              <h1
                lang="tr"
                className="font-heading text-[clamp(2.6rem,5.2vw,5rem)] leading-[1] tracking-[-0.015em] text-foreground"
              >
                {yazi.baslik}
              </h1>
              <p lang="tr" className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted lg:text-xl">
                {yazi.ozet}
              </p>
              {b.turkishOnly && (
                <p className="mt-6 inline-flex rounded-full border border-border px-4 py-2 text-sm text-muted">
                  {b.turkishOnly}
                </p>
              )}
            </FadeInUp>

            <div className="lg:col-span-5">
              <span className="relative mx-auto block aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full bg-surface lg:aspect-[3/4] lg:max-w-none">
                <img
                  src={yazi.kapak}
                  alt={yazi.kapakAlt}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gövde: içindekiler + yazı */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
          {basliklar.length > 1 && (
            <aside className="hidden border-t border-border pt-10 lg:col-span-3 lg:block">
              <nav aria-label={b.toc} className="sticky top-28">
                <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">{b.toc}</p>
                <ol lang="tr" className="space-y-3 text-[15px] leading-snug">
                  {basliklar.map((baslik, i) => (
                    <li key={baslik} className="flex gap-3">
                      <span aria-hidden="true" className="w-5 shrink-0 tabular-nums text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${baslikKimligi(baslik)}`}
                        className="text-foreground/75 transition-colors hover:text-brand"
                      >
                        {baslik}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className="border-t border-border pt-10 lg:col-span-8 lg:col-start-5 lg:pt-12 xl:col-span-7 xl:col-start-5">
            <article lang="tr" className="max-w-[68ch]">
              {yazi.bolumler.map((bolum, i) => (
                <Bolum key={bolum.baslik ?? `giris-${i}`} bolum={bolum} ilk={i === 0} />
              ))}
            </article>

            {proje && (
              <aside className="mt-16 max-w-[68ch] border-t border-border pt-10">
                <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
                  {b.relatedProject}
                </p>
                <Link
                  href={`/projelerimiz/${proje.slug}`}
                  className="group grid grid-cols-[6.5rem_1fr] items-center gap-5 sm:grid-cols-[9rem_1fr] sm:gap-8"
                >
                  <span className="relative block aspect-[3/4] overflow-hidden rounded-t-full bg-surface">
                    <img
                      src={proje.coverImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="block">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                      {kategori}
                    </span>
                    <span className="mt-2 block font-heading text-[clamp(1.5rem,2.4vw,2rem)] leading-tight text-foreground transition-colors group-hover:text-brand">
                      {proje.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                      {b.relatedProjectCta} <ArrowUpRight size={15} />
                    </span>
                  </span>
                </Link>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Çağrı */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <FadeInUp className="grid gap-8 bg-surface px-6 py-12 sm:px-10 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-16 lg:py-16">
            <div className="lg:col-span-7">
              <h2 className="font-heading text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] text-foreground">
                {b.ctaTitle}
              </h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">{b.ctaDesc}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <a
                href={whatsappLink(b.whatsappMessage.replace("{yazi}", yazi.baslik))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
              >
                <WhatsAppIcon size={17} />
                {b.ctaWhatsapp}
              </a>
              <Link
                href="/iletisim"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary active:scale-[0.98]"
              >
                {b.ctaVisit} <ArrowRight size={16} />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Diğer yazılar */}
      {digerleri.length > 0 && (
        <section className="pb-24 lg:pb-36">
          <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 flex items-baseline justify-between gap-6 border-t border-border pt-10">
              <h2 className="font-heading text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">{b.more}</h2>
              <Link
                href="/blog"
                className="inline-flex shrink-0 items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
              >
                {b.back} <ArrowRight size={14} />
              </Link>
            </div>
            <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {digerleri.map((diger) => (
                <li key={diger.slug}>
                  <BlogKarti yazi={diger} baslikSeviyesi="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
