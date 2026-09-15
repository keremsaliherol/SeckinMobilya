"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address, whatsappLink } from "@/lib/site";
import { getFeaturedProjects } from "@/data/projects";
import { kaydirmayiKilitle } from "@/components/ui/SmoothScrollProvider";
import { Monogram } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

export type NavLink = { href: string; label: string };

const ODAKLANABILIR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Panelde gösterilecek son projeler (öne çıkanlardan ilk üçü). */
const sonProjeler = getFeaturedProjects().slice(0, 3);

/**
 * Sağdan açılan site menüsü: sayfalar, son projeler ve iletişim.
 *
 * Her zaman DOM'da durur; açık/kapalı hâli yalnızca CSS sınıfıyla belirlenir.
 * `transition` sadece geçişi yumuşatır — geçiş çalışmasa bile panel doğrudan
 * son konumuna oturur, ekran dışında takılı kalmaz. Kapalıyken `inert`
 * olduğu için klavye ve ekran okuyucu içeriğine erişemez.
 */
export default function MenuPanel({
  id,
  open,
  onClose,
  links,
  isActive,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  isActive: (href: string) => boolean;
}) {
  const { lang, setLang, t } = useLang();
  const panelRef = useRef<HTMLElement>(null);
  const kapatRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    kaydirmayiKilitle(true);
    // Geçiş başlamadan odak taşınırsa tarayıcı paneli görünür alana kaydırmaya
    // çalışıp animasyonu bozuyor; bir kare beklenir.
    const odak = requestAnimationFrame(() => kapatRef.current?.focus());

    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Odak tuzağı: Tab ile panelden dışarı çıkılmaz.
      if (e.key !== "Tab" || !panelRef.current) return;
      const ogeler = [
        ...panelRef.current.querySelectorAll<HTMLElement>(ODAKLANABILIR),
      ];
      if (ogeler.length === 0) return;
      const ilk = ogeler[0];
      const son = ogeler[ogeler.length - 1];
      if (e.shiftKey && document.activeElement === ilk) {
        e.preventDefault();
        son.focus();
      } else if (!e.shiftKey && document.activeElement === son) {
        e.preventDefault();
        ilk.focus();
      }
    };
    window.addEventListener("keydown", tus);

    return () => {
      cancelAnimationFrame(odak);
      window.removeEventListener("keydown", tus);
      kaydirmayiKilitle(false);
    };
  }, [open, onClose]);

  /** Bağlantılar panel açılırken sırayla belirir. */
  const gecikme = (i: number) => ({
    transitionDelay: open ? `${180 + i * 55}ms` : "0ms",
  });
  const belirme = open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3";

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      inert={!open}
    >
      {/* Arka plan: tıklayınca kapanır */}
      <div
        className={`absolute inset-0 bg-shade/55 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={t.menu.label}
        data-lenis-prevent
        className={`absolute inset-y-0 right-0 flex w-full flex-col overflow-y-auto bg-ink text-on-ink sm:max-w-[31rem] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Üst satır */}
        <div className="flex items-center justify-between px-6 sm:px-10 h-[4.5rem] lg:h-20 shrink-0 border-b border-on-ink/10">
          <span className="inline-flex items-center gap-3 text-accent">
            <Monogram className="h-8" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-on-ink/65">
              {t.footer.since}
            </span>
          </span>
          <button
            ref={kapatRef}
            type="button"
            onClick={onClose}
            aria-label={t.menu.close}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-on-ink/25 pl-4 pr-3 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:border-on-ink hover:bg-on-ink hover:text-ink active:scale-[0.98]"
          >
            {t.menu.closeLabel}
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-12 px-6 sm:px-10 py-10">
          {/* Sayfalar */}
          <nav aria-label={t.menu.label}>
            <ul className="flex flex-col">
              {links.map((link, i) => {
                const aktif = isActive(link.href);
                return (
                  <li
                    key={link.href}
                    style={gecikme(i)}
                    className={`transition-[opacity,transform] duration-500 ${belirme}`}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={aktif ? "page" : undefined}
                      className={`group flex items-center gap-4 py-2 font-heading text-[2.35rem] sm:text-[2.6rem] leading-[1.1] transition-colors ${
                        aktif ? "text-accent" : "text-on-ink hover:text-accent"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-px bg-current transition-all duration-500 ${
                          aktif ? "w-8" : "w-0 group-hover:w-8"
                        }`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Son projeler */}
          <section
            style={gecikme(links.length)}
            className={`transition-[opacity,transform] duration-500 ${belirme}`}
          >
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                {t.menu.recent}
              </h2>
              <Link
                href="/projelerimiz"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs text-on-ink/75 transition-colors hover:text-on-ink"
              >
                {t.menu.allProjects} <ArrowUpRight size={14} />
              </Link>
            </div>
            <ul className="grid grid-cols-3 gap-3">
              {sonProjeler.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projelerimiz/${p.slug}`}
                    onClick={onClose}
                    className="group block"
                  >
                    {/* Kapsül tepeli çerçeve: logodaki kapsül motifi */}
                    <span className="block aspect-[3/4] overflow-hidden rounded-t-full bg-on-ink/10">
                      <img
                        src={p.coverImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-2 block text-[11px] leading-snug text-on-ink/75 transition-colors group-hover:text-on-ink">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* İletişim */}
          <section
            style={gecikme(links.length + 1)}
            className={`transition-[opacity,transform] duration-500 ${belirme}`}
          >
            <h2 className="mb-4 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
              {t.menu.contact}
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-3 tabular-nums transition-colors hover:text-accent"
                >
                  <Phone size={16} strokeWidth={1.75} className="text-on-ink/60" />
                  {contact.phoneDisplay}
                  <span className="text-on-ink/40">·</span>
                  <span className="text-on-ink/75">{contact.phoneAltDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(t.whatsapp.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-accent"
                >
                  <WhatsAppIcon size={16} className="text-on-ink/60" />
                  {t.whatsapp.label}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-accent"
                >
                  <InstagramIcon size={16} className="text-on-ink/60" />
                  {contact.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 text-on-ink/75 transition-colors hover:text-on-ink"
                >
                  <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-on-ink/60" />
                  {address.full}
                </a>
              </li>
            </ul>
          </section>

          {/* Dil */}
          <div
            role="group"
            aria-label={t.menu.language}
            className="mt-auto flex items-center gap-1 border-t border-on-ink/10 pt-6"
          >
            {(["TR", "EN"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`h-10 min-w-12 rounded-full px-4 text-xs font-medium tracking-[0.2em] transition-colors ${
                  lang === l
                    ? "bg-on-ink text-ink"
                    : "text-on-ink/65 hover:text-on-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
