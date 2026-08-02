"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, AlignJustify } from "lucide-react";
import InfoModal from "@/components/ui/InfoModal";
import Logo from "@/components/ui/Logo";
import { useLang } from "@/contexts/LanguageContext";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { lang, t } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/hizmetlerimiz", label: t.nav.services },
    { href: "/projelerimiz", label: t.nav.projects },
    { href: "/oncesi-sonrasi", label: t.nav.beforeAfter },
    { href: "/iletisim", label: t.nav.contact },
  ];

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen || !isHome
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <Link
          href="/"
          aria-label="Seçkin Mimarlık Mobilya İnşaat — Anasayfa"
          className="text-foreground transition-colors"
        >
          <Logo size="sm" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide font-medium transition-colors relative group ${
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* TR / EN + Menü butonu */}
          <button
            onClick={() => setInfoOpen(true)}
            aria-label="Menü ve iletişim bilgileri"
            className="flex items-center gap-2 px-3 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-all text-sm font-semibold tracking-widest"
          >
            <span>{lang}</span>
            <AlignJustify size={14} />
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          {/* Mobilde TR/EN butonu */}
          <button
            onClick={() => setInfoOpen(true)}
            aria-label="Menü ve iletişim bilgileri"
            className="flex items-center gap-1.5 px-3 py-3 border border-border text-foreground text-xs font-bold tracking-widest transition-all"
          >
            {lang}
            <AlignJustify size={12} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 text-foreground transition-colors"
            aria-label="Menü"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-3 border-b border-border/50 transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>

    {infoOpen && <InfoModal onClose={() => setInfoOpen(false)} />}
    </>
  );
}
