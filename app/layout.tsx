import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Intro from "@/components/ui/Intro";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { siteUrl, siteName, contact, address } from "@/lib/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  themeColor: "#0B0B0B",
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
  // Arama sonuçlarında ve yapay zekâ yanıtlarında kullanılacak görsel
  image: `${siteUrl}/hero/mutfak.jpg`,
  logo: `${siteUrl}/hero/mutfak.jpg`,
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
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
        <SmoothScrollProvider>
          <Intro />
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
