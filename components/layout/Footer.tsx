"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address, whatsappLink } from "@/lib/site";
import { Monogram } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const pages = [
    { href: "/", label: t.nav.home },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/hizmetlerimiz", label: t.nav.services },
    { href: "/projelerimiz", label: t.nav.projects },
    { href: "/oncesi-sonrasi", label: t.nav.beforeAfter },
    { href: "/iletisim", label: t.nav.contact },
  ];

  const baslik = "mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-accent";
  const baglanti = "transition-colors hover:text-accent";

  return (
    <footer className="relative overflow-hidden bg-ink text-on-ink">
      {/* Büyük, silik monogram: logodaki kapsülün sayfanın sonunda yankısı */}
      <Monogram className="pointer-events-none absolute -right-16 top-12 hidden h-[36rem] text-on-ink/[0.06] md:block" />

      <div className="relative mx-auto max-w-[88rem] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        {/* Marka cümlesi + hızlı iletişim */}
        <div className="grid items-end gap-10 border-b border-on-ink/15 pb-16 lg:grid-cols-[1.5fr_1fr] lg:pb-20">
          <p className="font-heading text-[clamp(2.5rem,5.6vw,4.9rem)] leading-[1.02] tracking-[-0.01em]">
            <span className="block">{f.statement[0]}</span>
            <span className="block italic text-accent">{f.statement[1]}</span>
          </p>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={whatsappLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-on-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-accent-light active:scale-[0.98]"
            >
              <WhatsAppIcon size={18} />
              {f.whatsappCta}
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-on-ink/30 px-6 text-sm font-medium tabular-nums transition-colors hover:border-on-ink hover:bg-on-ink hover:text-ink active:scale-[0.98]"
            >
              <Phone size={16} strokeWidth={1.75} />
              {contact.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Bilgi sütunları */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h2 className={baslik}>{f.contactHeading}</h2>
            <ul className="flex flex-col gap-3 text-[15px]">
              <li>
                <a href={`tel:${contact.phone}`} className={`${baglanti} tabular-nums`}>
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneAlt}`} className={`${baglanti} tabular-nums`}>
                  {contact.phoneAltDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${baglanti} inline-flex items-center gap-2`}
                >
                  <InstagramIcon size={16} />
                  {contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={baslik}>{f.addressHeading}</h2>
            <address className="text-[15px] not-italic leading-relaxed text-on-ink/85">
              {address.street}
              <br />
              {address.postalCode} {address.district} / {address.city}
            </address>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 border-b border-on-ink/25 pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <MapPin size={14} strokeWidth={1.75} />
              {f.directions}
              <ArrowUpRight size={14} />
            </a>
          </div>

          <nav aria-label={f.pagesHeading}>
            <h2 className={baslik}>{f.pagesHeading}</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] lg:grid-cols-1">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={baglanti}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Alt satır */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-on-ink/15 pt-8 text-xs text-on-ink/65 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Seçkin Mimarlık Mobilya İnşaat. {f.rights}
          </p>
          <span className="inline-flex items-center gap-3 uppercase tracking-[0.25em]">
            <Monogram className="h-6 text-accent" />
            {f.since}
          </span>
        </div>
      </div>
    </footer>
  );
}
