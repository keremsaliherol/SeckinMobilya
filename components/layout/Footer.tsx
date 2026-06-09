"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  const siteMap = [
    { href: "/", label: t.nav.home },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/hizmetlerimiz", label: t.nav.services },
    { href: "/projelerimiz", label: t.nav.projects },
    { href: "/oncesi-sonrasi", label: t.nav.beforeAfter },
    { href: "/iletisim", label: t.nav.contact },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <StaggerItem>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center shrink-0">
                <span className="text-white font-heading font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold text-sm tracking-wide text-white">
                  Seçkin Mimarlık
                </span>
                <span className="text-xs tracking-widest uppercase text-white/60">
                  Mobilya & İnşaat
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/seckinmobilyainsaat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded flex items-center justify-center hover:bg-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-heading font-semibold text-base mb-6 text-white">
              {t.footer.siteMap}
            </h4>
            <ul className="flex flex-col gap-3">
              {siteMap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-heading font-semibold text-base mb-6 text-white">
              {t.footer.ourServices}
            </h4>
            <ul className="flex flex-col gap-3">
              {[...t.footer.servicesList].map((h) => (
                <li key={h}>
                  <Link
                    href="/hizmetlerimiz"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {h}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h4 className="font-heading font-semibold text-base mb-6 text-white">
              {t.footer.contactHeading}
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-white/60 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:+905335209778"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    0533 520 97 78
                  </a>
                  <a
                    href="tel:+905417238551"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    0541 723 85 51
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <a
                  href="https://instagram.com/seckinmobilyainsaat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  @seckinmobilyainsaat
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-white/60 mt-0.5 shrink-0" />
                <span className="text-sm text-white/70 leading-relaxed">
                  Türkiye geneli ve yurt dışı projeler
                </span>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Seçkin Mimarlık Mobilya İnşaat. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
