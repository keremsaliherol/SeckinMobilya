"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}

const contact = {
  phone1: "0533 520 97 78",
  phone2: "0541 723 85 51",
  instagram: "@seckinmobilyainsaat",
  addressTR: "Türkiye geneli ve yurt dışı projeler",
  addressEN: "All across Turkey & international projects",
};

const socials = [
  { Icon: IconInstagram, href: "https://instagram.com/seckinmobilyainsaat", label: "Instagram" },
];

export default function InfoModal({ open, onClose }: InfoModalProps) {
  const { lang, setLang, t } = useLang();
  const im = t.infoModal;
  const address = lang === "TR" ? contact.addressTR : contact.addressEN;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[8999] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Side panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[9000] w-full max-w-sm flex flex-col overflow-y-auto"
            style={{ background: "#161616" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
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
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
              >
                <X size={17} />
              </button>
            </div>

            {/* Content */}
            <motion.div
              className="relative z-10 flex flex-col flex-1 px-8 py-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-heading font-bold text-xl leading-none">S</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-base tracking-wide leading-tight">
                    Seçkin Mimarlık
                  </p>
                  <p className="text-white/50 text-xs tracking-widest uppercase">Mobilya & İnşaat</p>
                </div>
              </div>

              {/* Slogan */}
              <p className="text-white/35 text-[11px] tracking-[0.22em] uppercase mb-6">
                {im.slogan}
              </p>

              <div className="w-8 h-px bg-primary/60 mb-7" />

              {/* CTA heading */}
              <h2 className="font-heading font-bold text-white text-xl mb-7 leading-snug">
                <span className="text-primary mr-1.5">★</span>
                {im.cta}
              </h2>

              {/* Contact list */}
              <div className="flex flex-col gap-3 text-sm mb-8">
                <a href={`tel:+905335209778`}
                  className="flex items-center gap-2.5 group">
                  <Phone size={12} className="text-primary shrink-0" />
                  <span className="text-white/40 text-xs">{im.phone1Label}:</span>
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">{contact.phone1}</span>
                </a>
                <a href={`tel:+905417238551`}
                  className="flex items-center gap-2.5 group">
                  <Phone size={12} className="text-primary shrink-0" />
                  <span className="text-white/40 text-xs">{im.phone2Label}:</span>
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors">{contact.phone2}</span>
                </a>
                <a href="https://instagram.com/seckinmobilyainsaat" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group">
                  <IconInstagram />
                  <span className="text-white/40 text-xs">{im.emailLabel}:</span>
                  <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">{contact.instagram}</span>
                </a>
                <div className="flex items-start gap-2.5 mt-1">
                  <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-white/45 text-xs leading-relaxed">{address}</span>
                </div>
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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
