"use client";

import { useLang } from "@/contexts/LanguageContext";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Sağ altta sabit "WhatsApp'tan bilgi al" butonu.
 *
 * Mobilde yalnızca ikon görünür; yazılı hâli dar ekranda içeriğin üstüne
 * biner. iPhone'daki alt çubuk için güvenli alan payı bırakılır.
 */
export default function WhatsAppButton() {
  const { t } = useLang();

  return (
    <a
      href={whatsappLink(t.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      /* Logo kahvesi + ince açık kenar: hem bej sayfada hem koyu kahve
         footer'da seçilebilir kalır (düz koyu kahve footer'da kayboluyordu). */
      className="group fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-3 rounded-full border border-on-ink/25 bg-brand p-1.5 text-on-ink shadow-[0_14px_34px_-12px_rgba(31,23,17,0.55)] transition-[background-color,transform] duration-300 hover:bg-primary active:scale-[0.98] sm:bottom-6 sm:right-6 sm:pr-6"
    >
      <span className="grid size-11 place-items-center rounded-full bg-on-ink/10 transition-colors group-hover:bg-on-ink/15">
        <WhatsAppIcon size={20} />
      </span>
      <span className="hidden text-[13px] font-medium tracking-wide sm:inline">
        {t.whatsapp.label}
      </span>
    </a>
  );
}
