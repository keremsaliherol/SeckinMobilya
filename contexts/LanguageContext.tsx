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
      home: "Ana Sayfa",
      about: "Hakkımızda",
      services: "Hizmetlerimiz",
      projects: "Projelerimiz",
      beforeAfter: "Öncesi / Sonrası",
      contact: "İletişim",
    },
    home: {
      hero: {
        eyebrow: "1975'ten bugüne · İstanbul",
        title: ["Tasarımdan montaja,", "tek elden."],
        desc: "Mutfak, gardırop, TV ünitesi ve anahtar teslim iç mekânlar. Her işi mekânın ölçüsüne göre tasarlıyor, üretiyor ve yerinde kuruyoruz.",
        cta1: "Projeleri incele",
        cta2: "Ücretsiz keşif iste",
        scroll: "Kaydırın",
        imageAlt: "Bej tonlarında, gizli aydınlatmalı yatak odası",
        overlayEyebrow: "Tasarım · Üretim · Montaj",
        overlayTitle: "Her proje, yerinde ölçüyle başlar.",
      },
      intro: {
        eyebrow: "Seçkin Mimarlık · 1975",
        statement: ["Önce çiziyoruz.", "Sonra birebir uyguluyoruz."],
        body: "1975'te aile şirketi olarak kurulan firmamız; mutfaktan gardıroba, TV ünitesinden anahtar teslim iç mekânlara kadar her işi ölçüye özel tasarlıyor, üretiyor ve monte ediyor.",
        more: "Hakkımızda",
        map: "Konum",
      },
      process: {
        eyebrow: "Nasıl çalışıyoruz",
        title: "Çizimden gerçeğe, üç adımda.",
        steps: [
          {
            title: "Tasarım",
            desc: "Mekânı yerinde ölçüyor, ihtiyaçlarınızı dinliyor ve projeyi çiziyoruz. Çizim, sizin onayınızla netleşiyor.",
          },
          {
            title: "Üretim",
            desc: "Onaylanan çizime göre dolapları ve mobilyaları mekânın ölçüsüne özel üretiyoruz.",
          },
          {
            title: "Montaj",
            desc: "Yerinde kurulumu yapıyor, son kontrollerin ardından mekânı kullanıma hazır teslim ediyoruz.",
          },
        ],
        frameAlt: "Bir mutfağın çiziminden bitmiş hâline geçiş",
      },
      rooms: {
        eyebrow: "Ne yapıyoruz",
        title: "Evin her köşesi için, ölçüye özel.",
        all: "Tüm hizmetler",
        view: "Projeyi gör",
        items: {
          mutfak: "Mutfak",
          "yatak-giyinme": "Yatak & giyinme odası",
          "tv-unitesi": "TV ünitesi & salon",
          "kahve-kosesi": "Kahve köşesi",
          banyo: "Banyo",
          "ofis-ticari": "Ofis & ticari alan",
        },
      },
      compare: {
        eyebrow: "Çizimden uygulamaya",
        title: "Çizim ile uygulama, aynı açıdan.",
        desc: "Tutamağı sağa sola sürükleyin: bir yanda projenin çizimi, diğer yanda aynı mekânın bitmiş hâli.",
        note: "Her projede önce ölçü alıp çizimi sizinle netleştiriyor, üretime onaylanan çizimle başlıyoruz.",
        before: "Çizim",
        after: "Uygulama",
        handle: "Karşılaştırma tutamağı",
      },
      projects: {
        eyebrow: "Projeler",
        title: "Son işlerimiz",
        desc: "İstanbul'da tamamladığımız konut, ofis ve ticari alan uygulamalarından bir seçki.",
        all: "Tüm projeler",
        allCard: "Tüm projeleri gör",
      },
      stats: {
        eyebrow: "Rakamlarla",
      },
      instagram: {
        eyebrow: "@seckinmobilyainsaat",
        title: ["Yeni projelerimiz", "önce Instagram'da."],
        desc: "Güncel uygulamalarımızı, detay fotoğraflarını ve kısa videolarımızı Instagram hesabımızdan takip edebilirsiniz.",
        follow: "Instagram'da takip et",
        whatsapp: "WhatsApp'tan yazın",
        visit: "Keşif ve ölçü için ücretsiz randevu:",
        videoLabel: "Seçkin Mimarlık tanıtım videosu: çizimden uygulamaya mutfak",
      },
    },
    footer: {
      statement: ["Ölçünüzü alalım,", "gerisini birlikte çizelim."],
      whatsappCta: "WhatsApp'tan yazın",
      contactHeading: "İletişim",
      addressHeading: "Adres",
      pagesHeading: "Sayfalar",
      directions: "Yol tarifi al",
      rights: "Tüm hakları saklıdır.",
      since: "1975'ten bugüne",
    },
    menu: {
      open: "Menüyü aç",
      close: "Menüyü kapat",
      label: "Menü",
      closeLabel: "Kapat",
      recent: "Son projeler",
      allProjects: "Tüm projeler",
      contact: "İletişim",
      language: "Dil seçimi",
    },
    whatsapp: {
      label: "WhatsApp'tan bilgi al",
      message: "Merhaba, web sitenizden ulaşıyorum. Bir proje hakkında bilgi almak istiyorum.",
    },
    notFound: {
      title: "Bu sayfa bulunamadı",
      desc: "Adres yanlış yazılmış ya da sayfa taşınmış olabilir. Ana sayfadan devam edebilir veya projelerimize göz atabilirsiniz.",
      home: "Ana sayfaya dön",
      projects: "Projeleri incele",
    },
    stats: [
      { target: 100, suffix: "+", label: "Tamamlanan Proje" },
      { target: 50, suffix: "+", label: "Yıl Deneyim" },
      { target: 100, suffix: "+", label: "Mutlu Müşteri" },
      { target: 5, suffix: "+", label: "Ülkede Hizmet" },
    ],
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
    home: {
      hero: {
        eyebrow: "Since 1975 · Istanbul",
        title: ["From design to installation,", "under one roof."],
        desc: "Kitchens, wardrobes, TV units and turnkey interiors. We design, build and install every piece to the exact measurements of your space.",
        cta1: "View projects",
        cta2: "Request a free site visit",
        scroll: "Scroll",
        imageAlt: "Beige bedroom with concealed lighting",
        overlayEyebrow: "Design · Production · Installation",
        overlayTitle: "Every project starts with a site measurement.",
      },
      intro: {
        eyebrow: "Seçkin Mimarlık · 1975",
        statement: ["First we draw it.", "Then we build it, exactly."],
        body: "Founded as a family business in 1975, we design, produce and install everything to measure — from kitchens and wardrobes to TV units and turnkey interiors.",
        more: "About us",
        map: "Location",
      },
      process: {
        eyebrow: "How we work",
        title: "From drawing to reality, in three steps.",
        steps: [
          {
            title: "Design",
            desc: "We measure the space on site, listen to your needs and draw the project. The drawing is finalised with your approval.",
          },
          {
            title: "Production",
            desc: "We build the cabinets and furniture to the exact measurements of your space, following the approved drawing.",
          },
          {
            title: "Installation",
            desc: "We install everything on site and hand over the space ready to use after a final check.",
          },
        ],
        frameAlt: "A kitchen transforming from drawing to finished space",
      },
      rooms: {
        eyebrow: "What we make",
        title: "Made to measure, for every corner of the home.",
        all: "All services",
        view: "View project",
        items: {
          mutfak: "Kitchens",
          "yatak-giyinme": "Bedrooms & wardrobes",
          "tv-unitesi": "TV units & living rooms",
          "kahve-kosesi": "Coffee corners",
          banyo: "Bathrooms",
          "ofis-ticari": "Offices & commercial",
        },
      },
      compare: {
        eyebrow: "From drawing to reality",
        title: "The drawing and the result, from the same angle.",
        desc: "Drag the handle left and right: the project drawing on one side, the finished space on the other.",
        note: "On every project we measure first, agree on the drawing with you, and only then start production.",
        before: "Drawing",
        after: "Result",
        handle: "Comparison handle",
      },
      projects: {
        eyebrow: "Projects",
        title: "Recent work",
        desc: "A selection of residential, office and commercial projects we completed in Istanbul.",
        all: "All projects",
        allCard: "See all projects",
      },
      stats: {
        eyebrow: "In numbers",
      },
      instagram: {
        eyebrow: "@seckinmobilyainsaat",
        title: ["Our newest projects", "land on Instagram first."],
        desc: "Follow our Instagram for recent work, close-up details and short videos.",
        follow: "Follow on Instagram",
        whatsapp: "Message us on WhatsApp",
        visit: "Free appointment for a site visit and measurement:",
        videoLabel: "Seçkin Mimarlık video: a kitchen from drawing to reality",
      },
    },
    footer: {
      statement: ["Let us measure your space,", "and draw the rest together."],
      whatsappCta: "Message us on WhatsApp",
      contactHeading: "Contact",
      addressHeading: "Address",
      pagesHeading: "Pages",
      directions: "Get directions",
      rights: "All rights reserved.",
      since: "Since 1975",
    },
    menu: {
      open: "Open menu",
      close: "Close menu",
      label: "Menu",
      closeLabel: "Close",
      recent: "Recent projects",
      allProjects: "All projects",
      contact: "Contact",
      language: "Language",
    },
    whatsapp: {
      label: "Ask us on WhatsApp",
      message: "Hello, I found you through your website. I'd like to ask about a project.",
    },
    notFound: {
      title: "Page not found",
      desc: "The address may be mistyped or the page may have moved. Continue from the home page or browse our projects.",
      home: "Back to home",
      projects: "View projects",
    },
    stats: [
      { target: 100, suffix: "+", label: "Completed Projects" },
      { target: 50, suffix: "+", label: "Years Experience" },
      { target: 100, suffix: "+", label: "Happy Clients" },
      { target: 5, suffix: "+", label: "Countries Served" },
    ],
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
