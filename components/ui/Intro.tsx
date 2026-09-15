"use client";

import { useEffect, useState } from "react";

/**
 * Zamanlama (ms). Akış: harfler ~1,5 sn'de tamamlanır, logo bir süre
 * ekranda durur ("nefes"), ardından perde yukarı kayar.
 */
/** Perde toplam ekranda kalma süresi. */
const SURE = 3600;
/** Perdenin yukarı kaymaya başlaması — logo tamamlandıktan sonra bekleme payı var. */
const KAPANMA = 2700;
/** Yazıların koşulsuz görünür kılınacağı an (animasyon güvenlik ağı). */
const ZORLA = 2200;
/** Aynı sekmede tekrar gösterilmemesi için işaret. */
const ANAHTAR = "seckin-intro";

const BASLIK = "SEÇKİN MİMARLIK";

/**
 * Sitenin açılış perdesi.
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

    if (gorulmus) {
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
      className="intro-katman fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Üst ince çizgi */}
      <span className="intro-cizgi block w-24 h-px bg-primary/70 mb-10" />

      {/* Ana logo — harfler sırayla belirir.
          Bilerek başlık etiketi değil: perde her sayfada göründüğü için h1
          kullanılırsa sayfanın gerçek başlığıyla çakışıp SEO'yu bozuyordu. */}
      <div className="font-sans font-light text-foreground text-center px-6 text-[clamp(1.1rem,4.5vw,2.4rem)] leading-none">
        {BASLIK.split("").map((harf, i) => (
          <span
            key={i}
            className="intro-harf"
            style={{
              animationDelay: `${0.3 + i * 0.05}s`,
              letterSpacing: "0.2em",
            }}
          >
            {harf === " " ? " " : harf}
          </span>
        ))}
      </div>

      {/* Alt satır */}
      <p
        className="intro-alt font-sans font-light text-muted mt-5 text-[clamp(0.55rem,1.8vw,0.75rem)]"
        style={{ letterSpacing: "0.34em" }}
      >
        MOBİLYA&nbsp;&nbsp;|&nbsp;&nbsp;İNŞAAT
      </p>

      {/* Alt ince çizgi */}
      <span className="intro-cizgi block w-24 h-px bg-primary/70 mt-10" />

      {/* Kuruluş yılı */}
      <span
        className="intro-yil absolute bottom-10 text-[10px] text-muted/70 font-sans"
        style={{ letterSpacing: "0.3em" }}
      >
        EST. 1975
      </span>
    </div>
  );
}
