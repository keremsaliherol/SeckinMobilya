/**
 * Site geneli sabitler.
 *
 * Alan adı belli olduğunda NEXT_PUBLIC_SITE_URL ortam değişkenini
 * (Vercel/Netlify panelinden veya .env dosyasından) ayarlamak yeterli;
 * sitemap, robots ve Open Graph adresleri otomatik güncellenir.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://seckinmimarlik.com";

export const siteName = "Seçkin Mimarlık Mobilya İnşaat";

/**
 * İletişim bilgileri — sitedeki TEK kaynak.
 * Telefon değişecekse sadece burayı düzenlemek yeterli.
 *
 * phone     : İşletme sahibinin numarası. Birincil numara; iletişim
 *             formundan gelen WhatsApp mesajları buraya düşer.
 * phoneAlt  : İkinci numara.
 */
export const contact = {
  phone: "+905417238551",
  phoneDisplay: "0541 723 85 51",
  phoneAlt: "+905335209778",
  phoneAltDisplay: "0533 520 97 78",
  /** wa.me formatı: başında + ve boşluk olmadan */
  whatsapp: "905417238551",
  instagram: "https://instagram.com/seckinmobilyainsaat",
  instagramHandle: "@seckinmobilyainsaat",
} as const;

/** İşletmenin fiziki adresi ve harita konumu. */
export const address = {
  street: "100. Yıl, Kışla Cd. No:86",
  district: "Bağcılar",
  city: "İstanbul",
  postalCode: "34204",
  country: "TR",
  /** Tek satır gösterim */
  full: "100. Yıl, Kışla Cd. No:86, 34204 Bağcılar/İstanbul",
  lat: 41.0614783,
  lng: 28.8527604,
  /** Haritada "Yol tarifi al" için kısa bağlantı */
  mapsUrl: "https://maps.app.goo.gl/nTArNXMrnyHXxQgL6",
} as const;

/** Google Haritalar gömme adresi (API anahtarı gerektirmez). */
export const mapEmbedUrl = `https://maps.google.com/maps?q=${address.lat},${address.lng}&hl=tr&z=17&output=embed`;
