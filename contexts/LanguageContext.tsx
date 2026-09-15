"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { pageTranslations } from "./pageTranslations";

export type Lang = "TR" | "EN";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)["TR"] | (typeof translations)["EN"];
  p: (typeof pageTranslations)["TR"] | (typeof pageTranslations)["EN"];
}

const translations = {
  TR: {
    nav: {
      home: "Anasayfa",
      about: "Hakkımızda",
      services: "Hizmetlerimiz",
      projects: "Projelerimiz",
      beforeAfter: "Öncesi / Sonrası",
      contact: "İletişim",
    },
    hero: {
      slides: [
        {
          tag: "1975'ten Bugüne",
          title: "1975'ten Bugüne Güvenle İnşa Ediyoruz",
          subtitle: "Mimarlık, mobilya ve inşaat alanlarında yarım asırlık tecrübeyle anahtar teslim profesyonel çözümler sunuyoruz.",
        },
        {
          tag: "İç Mimarlık & Tasarım",
          title: "Hayalinizdeki Mekânları Tasarlıyoruz",
          subtitle: "Modern tasarım anlayışını güçlü uygulama tecrübesiyle birleştirerek yaşam alanlarınıza değer katıyoruz.",
        },
        {
          tag: "Mimarlık & İnşaat",
          title: "Tasarımın Gücü, Ustalığın Tecrübesi",
          subtitle: "Konut, villa, ofis ve ticari alanlarda proje planlama, uygulama ve anahtar teslim çözümler.",
        },
      ],
      cta1: "Projelerimizi İncele",
      cta2: "Teklif Al",
    },
    services: {
      badge: "Hizmetlerimiz",
      heading: "Profesyonel Çözümler",
      allLink: "Tüm Hizmetlerimiz",
      detail: "Detaylı Bilgi",
      items: [
        {
          title: "Anahtar Teslim İnşaat",
          description: "Konut, villa, ofis ve ticari alanlarda proje planlama, uygulama ve teslim süreçlerinin profesyonel yönetimi.",
        },
        {
          title: "İç Mimarlık ve Tasarım",
          description: "Modern, estetik ve işlevsel yaşam alanları için özel iç mimari çözümler ve 3D proje tasarımları.",
        },
        {
          title: "Özel Üretim Mobilya",
          description: "Mekâna özel ölçü ve tasarımlarla mutfak dolabı, TV ünitesi, yatak odası ve dekoratif mobilya üretimi.",
        },
      ],
    },
    projects: {
      badge: "Portföy",
      heading: "Öne Çıkan Projeler",
      allLink: "Tüm Projeler",
      inspect: "Projeyi İncele",
    },
    about: {
      badge: "Hakkımızda",
      heading: "1975'ten Bugüne\nGüven, Kalite ve Tecrübe",
      p1: "1975 yılında aile şirketi olarak temelleri atılan Seçkin Mimarlık Mobilya İnşaat, yılların verdiği deneyim ve ustalıkla bugün mimarlık, mobilya ve inşaat alanlarında anahtar teslim profesyonel çözümler sunmaktadır.",
      p2: "Kurulduğu günden bu yana kalite, güven ve müşteri memnuniyetini ön planda tutan firmamız; modern tasarım anlayışını güçlü uygulama tecrübesiyle birleştirerek yaşam alanlarına değer katmaktadır.",
      highlights: [
        "1975'ten beri sektör deneyimi",
        "100+ tamamlanan proje",
        "Türkiye geneli ve yurt dışı hizmet",
        "Anahtar teslim profesyonel çözümler",
      ],
      cta: "Daha Fazla Bilgi",
      experience: "Yıl Deneyim",
    },
    cta: {
      badge: "Hayalinizdeki Proje",
      heading: "Bir Proje Başlatalım",
      desc: "Ücretsiz keşif ve danışmanlık için bugün bize ulaşın. Projenizi birlikte değerlendirelim ve size en uygun çözümü sunalım.",
      btn1: "İletişime Geç",
      btn2: "0541 723 85 51",
    },
    marquee: ["MİMARLIK", "İNŞAAT", "İÇ MİMARLIK", "ÖZEL MOBİLYA", "TADİLAT", "PROJE YÖNETİMİ", "ANAHTAR TESLİM"],
    footer: {
      desc: "1975'ten bugüne mimarlık, mobilya ve inşaat alanlarında anahtar teslim profesyonel çözümler sunuyoruz.",
      siteMap: "Site Haritası",
      ourServices: "Hizmetlerimiz",
      contactHeading: "İletişim",
      rights: "Tüm hakları saklıdır.",
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Koşulları",
      servicesList: [
        "Anahtar Teslim İnşaat",
        "İç Mimarlık ve Tasarım",
        "Özel Üretim Mobilya",
        "Tadilat ve Renovasyon",
        "Ofis ve Ticari Alan Tasarımı",
        "Uygulama ve Proje Yönetimi",
      ],
    },
    stats: [
      { target: 100, suffix: "+", label: "Tamamlanan Proje" },
      { target: 50, suffix: "+", label: "Yıl Deneyim" },
      { target: 100, suffix: "+", label: "Mutlu Müşteri" },
      { target: 5, suffix: "+", label: "Ülkede Hizmet" },
    ],
    infoModal: {
      slogan: "1975'TEN BUGÜNE GÜVEN, KALİTE VE TECRÜBE",
      cta: "BİR PROJE BAŞLATALIM",
      phone1Label: "Tel",
      phone2Label: "Tel 2",
      emailLabel: "Instagram",
    },
  },
  EN: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      projects: "Projects",
      beforeAfter: "Before / After",
      contact: "Contact",
    },
    hero: {
      slides: [
        {
          tag: "Since 1975",
          title: "Building with Trust Since 1975",
          subtitle: "We provide turnkey professional solutions in architecture, furniture and construction with half a century of experience.",
        },
        {
          tag: "Interior Design",
          title: "We Design the Spaces You Dream Of",
          subtitle: "We add value to living spaces by combining modern design with strong implementation experience.",
        },
        {
          tag: "Architecture & Construction",
          title: "The Power of Design, The Expertise of Craftsmanship",
          subtitle: "Project planning, implementation and turnkey solutions for residential, villa, office and commercial spaces.",
        },
      ],
      cta1: "View Our Projects",
      cta2: "Get a Quote",
    },
    services: {
      badge: "Our Services",
      heading: "Professional Solutions",
      allLink: "All Services",
      detail: "Learn More",
      items: [
        {
          title: "Turnkey Construction",
          description: "Professional management of planning, implementation and delivery for residential, villa, office and commercial projects.",
        },
        {
          title: "Interior Design",
          description: "Custom interior design solutions and 3D project designs for modern, aesthetic and functional living spaces.",
        },
        {
          title: "Custom Furniture",
          description: "Space-specific kitchen cabinets, TV units, bedrooms and decorative furniture with custom dimensions and designs.",
        },
      ],
    },
    projects: {
      badge: "Portfolio",
      heading: "Featured Projects",
      allLink: "All Projects",
      inspect: "View Project",
    },
    about: {
      badge: "About Us",
      heading: "Trust, Quality and Experience\nSince 1975",
      p1: "Founded in 1975 as a family business, Seçkin Architecture Furniture Construction today offers turnkey professional solutions in architecture, furniture and construction with decades of experience and craftsmanship.",
      p2: "Since its founding, our company has prioritized quality, trust and customer satisfaction; combining modern design with strong implementation experience to add value to living spaces.",
      highlights: [
        "Industry experience since 1975",
        "100+ completed projects",
        "Service across Turkey & abroad",
        "Turnkey professional solutions",
      ],
      cta: "Learn More",
      experience: "Years Experience",
    },
    cta: {
      badge: "Your Dream Project",
      heading: "Let's Start a Project",
      desc: "Contact us today for a free inspection and consultation. Let's evaluate your project together and offer you the best solution.",
      btn1: "Get in Touch",
      btn2: "0541 723 85 51",
    },
    marquee: ["ARCHITECTURE", "CONSTRUCTION", "INTERIOR DESIGN", "CUSTOM FURNITURE", "RENOVATION", "PROJECT MANAGEMENT", "TURNKEY SOLUTIONS"],
    footer: {
      desc: "Since 1975, we provide turnkey professional solutions in architecture, furniture and construction.",
      siteMap: "Site Map",
      ourServices: "Our Services",
      contactHeading: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      servicesList: [
        "Turnkey Construction",
        "Interior Design",
        "Custom Furniture",
        "Renovation",
        "Office & Commercial Design",
        "Project Management",
      ],
    },
    stats: [
      { target: 100, suffix: "+", label: "Completed Projects" },
      { target: 50, suffix: "+", label: "Years Experience" },
      { target: 100, suffix: "+", label: "Happy Clients" },
      { target: 5, suffix: "+", label: "Countries Served" },
    ],
    infoModal: {
      slogan: "TRUST, QUALITY AND EXPERIENCE SINCE 1975",
      cta: "LET'S START A PROJECT",
      phone1Label: "Phone",
      phone2Label: "Phone 2",
      emailLabel: "Instagram",
    },
  },
} as const;

export type Translations = (typeof translations)["TR"] | (typeof translations)["EN"];

const LanguageContext = createContext<LanguageContextType>({
  lang: "TR",
  setLang: () => {},
  t: translations.TR as Translations,
  p: pageTranslations.TR,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("TR");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations, p: pageTranslations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
