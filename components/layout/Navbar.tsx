"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, AlignJustify } from "lucide-react";
import InfoModal from "@/components/ui/InfoModal";
import { useLang } from "@/contexts/LanguageContext";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { lang, setLang, t } = useLang();
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
          ? "bg-white shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center shrink-0">
            <span className="text-white font-heading font-bold text-lg leading-none">S</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className={`font-heading font-bold text-sm tracking-wide transition-colors ${
                scrolled || menuOpen || !isHome ? "text-foreground" : "text-white"
              }`}
            >
              Seçkin Mimarlık
            </span>
            <span
              className={`text-xs tracking-widest uppercase transition-colors ${
                scrolled || menuOpen || !isHome ? "text-muted" : "text-white/70"
              }`}
            >
              Mobilya & İnşaat
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide font-medium transition-colors relative group ${
                pathname === link.href
                  ? "text-primary"
                  : scrolled || !isHome
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
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
            className={`flex items-center gap-2 px-3 py-2 rounded border transition-all text-sm font-semibold tracking-widest ${
              scrolled || !isHome
                ? "border-border text-foreground hover:border-primary hover:text-primary"
                : "border-white/30 text-white hover:border-white hover:bg-white/10"
            }`}
          >
            <span>{lang}</span>
            <AlignJustify size={14} />
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          {/* Mobilde TR/EN butonu */}
          <button
            onClick={() => setInfoOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-bold tracking-widest transition-all ${
              scrolled || menuOpen || !isHome
                ? "border-border text-foreground"
                : "border-white/30 text-white"
            }`}
          >
            {lang}
            <AlignJustify size={12} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 transition-colors ${
              scrolled || menuOpen || !isHome ? "text-foreground" : "text-white"
            }`}
            aria-label="Menü"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-border/50 transition-colors ${
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

    <InfoModal
      open={infoOpen}
      onClose={() => setInfoOpen(false)}
    />
    </>
  );
}
