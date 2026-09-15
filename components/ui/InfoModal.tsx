"use client";

import { useEffect, useState } from "react";
import { X, Phone, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address as businessAddress } from "@/lib/site";
import Logo from "@/components/ui/Logo";

const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

interface InfoModalProps {
  onClose: () => void;
}

const address = {
  TR: "Türkiye geneli ve yurt dışı projeler",
  EN: "All across Turkey & international projects",
};

const socials = [
  { Icon: IconInstagram, href: contact.instagram, label: "Instagram" },
];

export default function InfoModal({ onClose }: InfoModalProps) {
  const { lang, setLang, t } = useLang();
  const im = t.infoModal;
  const addressText = address[lang];

  /**
   * Panelin nihai konumunu CSS sınıfı belirler, `transition` yalnızca geçişi
   * yumuşatır. Böylece animasyon herhangi bir sebeple çalışmazsa panel
   * ekran dışında takılı kalmaz, doğrudan yerine oturur.
   */
  const [icerde, setIcerde] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIcerde(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[8999] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
              icerde ? "opacity-100" : "opacity-0"
            }`}
            onClick={onClose}
          />

          {/* Side panel */}
          <div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="İletişim bilgileri"
            className={`fixed top-0 right-0 bottom-0 z-[9000] w-full max-w-sm flex flex-col overflow-y-auto border-l border-border transition-transform duration-300 ease-out ${
              icerde ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ background: "var(--color-surface)" }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg,#C6A15B 0,#C6A15B 1px,transparent 0,transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Header row: lang + close */}
            <div className="relative z-10 flex items-center justify-between px-8 pt-7 pb-4 shrink-0">
              <div className="flex items-center gap-1">
                {(["TR", "EN"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-xs font-bold tracking-widest transition-all rounded ${
                      lang === l
                        ? "bg-white/10 text-white"
                        : "text-white/35 hover:text-white/70"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={onClose}
                aria-label="Kapat"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
              >
                <X size={17} />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col flex-1 px-8 py-6">
              {/* Logo */}
              <div className="mb-8 text-white">
                <Logo size="md" />
              </div>

              {/* Slogan */}
              <p className="text-white/35 text-[11px] tracking-[0.22em] uppercase mb-6">
                {im.slogan}
              </p>

              <div className="w-8 h-px bg-primary/60 mb-7" />

              {/* CTA heading */}
              <h2 className="font-heading font-bold text-white text-xl mb-7 leading-snug">
                {im.cta}
              </h2>

              {/* Contact list */}
              <div className="flex flex-col gap-3 text-sm mb-8">
                <a href={`tel:${contact.phone}`}
                  className="flex items-center gap-2.5 group">
                  <Phone size={12} className="text-primary shrink-0" />
                  <span className="text-white/40 text-xs">{im.phone1Label}:</span>
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">{contact.phoneDisplay}</span>
                </a>
                <a href={`tel:${contact.phoneAlt}`}
                  className="flex items-center gap-2.5 group">
                  <Phone size={12} className="text-primary shrink-0" />
                  <span className="text-white/40 text-xs">{im.phone2Label}:</span>
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">{contact.phoneAltDisplay}</span>
                </a>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group">
                  <IconInstagram />
                  <span className="text-white/40 text-xs">{im.emailLabel}:</span>
                  <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">{contact.instagramHandle}</span>
                </a>
                <a
                  href={businessAddress.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 mt-1 group"
                >
                  <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-white/45 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                    {businessAddress.full}
                    <span className="block text-white/30 mt-0.5">{addressText}</span>
                  </span>
                </a>
              </div>

              <div className="w-6 h-px bg-white/10 mb-7" />

              {/* Socials */}
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/40 transition-all"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}
