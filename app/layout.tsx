import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Intro from "@/components/ui/Intro";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { siteUrl, siteName, contact, address } from "@/lib/site";

/**
 * Fontlar değişken (variable) olarak yüklenir: tek dosya tüm kalınlıkları
 * taşır. "latin-ext" şart — ş, ğ, ı, İ harfleri bu alt kümede; olmazsa bu
 * harfler yedek fonttan gelip başlıklarda göze batıyor.
 *
 * Başlık: Cormorant Garamond — logodaki ince-kalın kontrastlı "S" ile uyumlu.
 * Gövde:  Outfit — geometrik, sade, küçük boyutlarda okunaklı.
 */
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

const title = `${siteName} | 1975'ten Bugüne Güven, Kalite ve Tecrübe`;
const description =
  "1975'ten bugüne mimarlık, mobilya ve inşaat alanlarında anahtar teslim profesyonel çözümler. İç mimarlık, özel üretim mobilya, tadilat ve proje yönetimi.";

/**
 * Paylaşım önizleme görseli (WhatsApp, Instagram, Facebook, X).
 * 1200x630 — bu ölçü tüm platformlarda kırpılmadan görünür.
 * Kaynak: public/hero/mutfak.jpg
 */
const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${siteName} — mutfak ve iç mimarlık uygulaması`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "mimarlık",
    "iç mimarlık",
    "özel üretim mobilya",
    "anahtar teslim inşaat",
    "tadilat",
    "renovasyon",
    "proje yönetimi",
    "mutfak dolabı",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F1EA",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: siteName,
  description,
  url: siteUrl,
  telephone: [contact.phone, contact.phoneAlt],
  foundingDate: "1975",
  sameAs: [contact.instagram, address.mapsUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.district,
    addressRegion: address.city,
    postalCode: address.postalCode,
    addressCountry: address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: address.lat,
    longitude: address.lng,
  },
  // Yerel aramada öne çıkmak için hizmet bölgesi il/ilçe düzeyinde verilir
  areaServed: [
    { "@type": "City", name: "İstanbul" },
    { "@type": "Country", name: "Türkiye" },
  ],
  // Arama sonuçlarında ve yapay zekâ yanıtlarında kullanılacak işletme görseli
  image: `${siteUrl}/hero/mutfak.jpg`,
  // Bilgi kartında görünen marka işareti — fotoğraf değil, logo olmalı
  logo: `${siteUrl}/icon.png`,
  knowsLanguage: ["tr", "en"],
  makesOffer: [
    "Anahtar Teslim İnşaat",
    "İç Mimarlık ve Tasarım",
    "Özel Üretim Mobilya",
    "Tadilat ve Renovasyon",
    "Ofis ve Ticari Alan Tasarımı",
    "Uygulama ve Proje Yönetimi",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
        <SmoothScrollProvider>
          <Intro />
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
