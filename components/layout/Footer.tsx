"use client";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address } from "@/lib/site";
import Logo from "@/components/ui/Logo";

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
    <footer className="bg-surface text-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <StaggerItem>
            <div className="mb-6 text-white">
              <Logo size="sm" />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-border flex items-center justify-center text-white/70 hover:border-primary hover:text-primary transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
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
                    href={`tel:${contact.phone}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${contact.phoneAlt}`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {contact.phoneAltDisplay}
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
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors leading-relaxed not-italic"
                >
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.postalCode} {address.district}/{address.city}
                  </address>
                </a>
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
