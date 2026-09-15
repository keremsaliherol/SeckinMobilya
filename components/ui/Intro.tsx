"use client";

import { useEffect, useState } from "react";
import {
  MONOGRAM_CAPSULE as K,
  MONOGRAM_S_PATH,
  MONOGRAM_VIEWBOX,
} from "@/components/ui/monogram";

/**
 * Zamanlama (ms). Akış: kapsül çizilir → "S" yukarıdan aşağı belirir →
 * yazı gelir → kısa bir "nefes" → perde yukarı kayar.
 */
/** Perde toplam ekranda kalma süresi. */
const SURE = 3700;
/** Perdenin yukarı kaymaya başlaması. */
const KAPANMA = 2800;
/** Öğelerin koşulsuz görünür kılınacağı an (animasyon güvenlik ağı). */
const ZORLA = 2400;
/** Aynı sekmede tekrar gösterilmemesi için işaret. */
const ANAHTAR = "seckin-intro";

/**
 * Sitenin açılış perdesi: logo kendini çizer.
 *
 * "Önce çiziyoruz, sonra uyguluyoruz" fikrinin ilk karesi — kapsül çerçeve
 * bir çizgi olarak çizilir, ardından "S" dolar.
 *
 * Yalnızca oturumun ilk açılışında görünür; sayfalar arası gezinmede
 * tekrar etmez. Hareket azaltma tercihi açıksa hiç gösterilmez.
 *
 * Perdenin kalkması CSS animasyonuna değil zamanlayıcıya bağlıdır: animasyon
 * herhangi bir sebeple çalışmazsa bile perde kesin olarak kaldırılır, aksi
 * hâlde site erişilemez hâle gelirdi.
 */
export default function Intro() {
  const [gorunur, setGorunur] = useState(true);
  const [kapaniyor, setKapaniyor] = useState(false);
  const [zorla, setZorla] = useState(false);

  useEffect(() => {
    const gorulmus = sessionStorage.getItem(ANAHTAR) === "1";
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (gorulmus || azHareket) {
      const hemen = setTimeout(() => setGorunur(false), 0);
      return () => clearTimeout(hemen);
    }

    sessionStorage.setItem(ANAHTAR, "1");
    document.body.style.overflow = "hidden";

    const zorlaGoster = setTimeout(() => setZorla(true), ZORLA);
    const kapat = setTimeout(() => setKapaniyor(true), KAPANMA);
    const kaldir = setTimeout(() => setGorunur(false), SURE);

    return () => {
      clearTimeout(zorlaGoster);
      clearTimeout(kapat);
      clearTimeout(kaldir);
    };
  }, []);

  // Perde kalkınca sayfa kaydırması her hâlükârda geri açılır
  useEffect(() => {
    if (!gorunur) document.body.style.overflow = "";
  }, [gorunur]);

  if (!gorunur) return null;

  return (
    <div
      data-kapaniyor={kapaniyor}
      data-zorla={zorla}
      aria-hidden="true"
      className="intro-katman fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-background px-6 text-brand"
    >
      {/* Monogram: iki katman üst üste — altta çizilen kapsül, üstte beliren "S" */}
      <div className="relative aspect-[400/772] h-[clamp(9rem,26vh,13rem)]">
        <svg viewBox={MONOGRAM_VIEWBOX} className="absolute inset-0 h-full w-full">
          <rect
            className="intro-kapsul"
            x={K.x}
            y={K.y}
            width={K.width}
            height={K.height}
            rx={K.rx}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={K.strokeWidth}
          />
        </svg>
        <div className="intro-s absolute inset-0">
          <svg viewBox={MONOGRAM_VIEWBOX} className="h-full w-full">
            <path fill="currentColor" d={MONOGRAM_S_PATH} />
          </svg>
        </div>
      </div>

      {/* Bilerek başlık etiketi değil: perde her sayfada göründüğü için h1
          kullanılırsa sayfanın gerçek başlığıyla çakışıp SEO'yu bozuyordu. */}
      <p className="intro-yazi mt-9 text-center font-sans text-[clamp(0.95rem,2.6vw,1.35rem)] font-normal uppercase text-foreground">
        Seçkin Mimarlık
      </p>
      <p
        className="intro-alt mt-3 font-sans text-[clamp(0.6rem,1.6vw,0.72rem)] font-light uppercase text-muted"
        style={{ letterSpacing: "0.34em" }}
      >
        Tasarım · Üretim · Montaj
      </p>

      <span
        className="intro-yil absolute bottom-10 font-sans text-[10px] text-muted"
        style={{ letterSpacing: "0.3em" }}
      >
        1975
      </span>
    </div>
  );
}
