"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import MenuPanel, { type NavLink } from "@/components/layout/MenuPanel";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const menuButonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Ana sayfada, kaydırılmamışken menü açılış fotoğrafının üstünde durur. */
  const onPhoto = pathname === "/" && !scrolled;

  const links: NavLink[] = [
    { href: "/", label: t.nav.home },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/hizmetlerimiz", label: t.nav.services },
    { href: "/projelerimiz", label: t.nav.projects },
    { href: "/oncesi-sonrasi", label: t.nav.beforeAfter },
    { href: "/iletisim", label: t.nav.contact },
  ];

  /** Proje detay sayfalarında "Projelerimiz" de aktif görünür. */
  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  const menuyuKapat = useCallback(() => {
    setMenuOpen(false);
    menuButonRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          onPhoto
            ? "border-transparent bg-transparent text-white"
            : "border-border bg-background/90 text-foreground backdrop-blur-md"
        }`}
      >
        <div className="mx-auto grid h-[4.5rem] max-w-[88rem] grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-8 lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
          <Link
            href="/"
            aria-label="Seçkin Mimarlık Mobilya İnşaat — Ana Sayfa"
            className={`justify-self-start transition-colors ${onPhoto ? "text-white" : "text-brand"}`}
          >
            <Logo size="sm" />
          </Link>

          <nav aria-label={t.menu.label} className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {links.map((link) => {
                const aktif = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={aktif ? "page" : undefined}
                      className={`group relative block py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                        onPhoto
                          ? aktif
                            ? "text-white"
                            : "text-white/75 hover:text-white"
                          : aktif
                            ? "text-brand"
                            : "text-foreground/70 hover:text-brand"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ${
                          aktif ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <div
              role="group"
              aria-label={t.menu.language}
              className="hidden items-center text-[11px] font-medium tracking-[0.18em] lg:flex"
            >
              {(["TR", "EN"] as const).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`px-1.5 py-2 transition-opacity ${
                      lang === l ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>

            <button
              ref={menuButonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={t.menu.open}
              className={`group inline-flex h-11 items-center gap-3 rounded-full border pl-4 pr-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors active:scale-[0.98] ${
                onPhoto
                  ? "border-white/40 hover:bg-white hover:text-foreground"
                  : "border-border hover:border-primary hover:bg-primary hover:text-on-ink"
              }`}
            >
              <span className="hidden sm:inline">{t.menu.label}</span>
              {/* İki çizgili menü işareti; alttaki çizgi üzerine gelince uzar */}
              <span aria-hidden="true" className="flex w-5 flex-col items-end gap-[5px]">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-3 bg-current transition-[width] duration-300 group-hover:w-5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuPanel
        id="site-menu"
        open={menuOpen}
        onClose={menuyuKapat}
        links={links}
        isActive={isActive}
      />
    </>
  );
}
