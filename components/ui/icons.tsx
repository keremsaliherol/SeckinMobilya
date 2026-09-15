/**
 * lucide-react'te bulunmayan marka ikonları.
 * Çizgi kalınlığı ve köşe yapısı lucide ikonlarıyla aynı tutuldu (24px ızgara,
 * 1.75 çizgi), böylece yan yana kullanıldığında aynı aileden görünürler.
 */

type IconProps = { className?: string; size?: number };

export function InstagramIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Konuşma balonu içinde telefon ahizesi — WhatsApp bağlantıları için. */
export function WhatsAppIcon({ className = "", size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3.5 20.5l1.35-4.1A8.6 8.6 0 1 1 20.5 11.6Z" />
      <path d="M9.2 8.3c.3-.5.8-.5 1.1 0l.8 1.4c.2.4.1.8-.2 1.1l-.5.5c.5 1 1.3 1.9 2.4 2.4l.5-.5c.3-.3.7-.4 1.1-.2l1.4.8c.5.3.5.8 0 1.1-.8.6-1.7.9-2.6.6-2.3-.8-4.1-2.6-4.9-4.9-.3-.9 0-1.8.9-2.3Z" />
    </svg>
  );
}
