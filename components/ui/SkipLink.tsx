"use client";

import { useLang } from "@/contexts/LanguageContext";

/**
 * Klavye kullanıcıları için "İçeriğe atla" bağlantısı: sayfadaki ilk odaklanabilir
 * öğe. Normalde görünmez, Tab ile odaklanınca sol üstte belirir ve menüyü
 * atlayıp doğrudan <main id="icerik">'e gider. Açılış perdesinin de üstünde durur.
 */
export default function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#icerik"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-on-ink"
    >
      {t.a11y.skip}
    </a>
  );
}
