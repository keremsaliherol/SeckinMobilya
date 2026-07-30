"use client";

import { useEffect } from "react";

/** Sağlık kontrolünün yapılacağı an (ms). */
const KONTROL_ANI = 1200;
/** Bu süre içinde beklenen en az kare sayısı. Altındaysa döngü çalışmıyordur. */
const ASGARI_KARE = 10;

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let iptal = false;
    let rafId: number | undefined;
    let saglikZamanlayici: ReturnType<typeof setTimeout> | undefined;
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;

    const durdur = () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      rafId = undefined;
      if (saglikZamanlayici) clearTimeout(saglikZamanlayici);
      saglikZamanlayici = undefined;
      lenis?.destroy();
      lenis = undefined;
    };

    const baslat = () => {
      if (lenis) return;

      import("lenis")
        .then(({ default: Lenis }) => {
          if (iptal) return;

          lenis = new Lenis({
            // lerp: her karede hedefe yaklaşma oranı. Düşük değer daha uzun
            // süzülme, yani daha yumuşak his verir. 0.06 altı "sünger" gibi
            // gecikmeli hissettirir, 0.12 üstü sertleşir.
            lerp: 0.075,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            // Dokunmatikte cihazın kendi kaydırması daha doğal; Lenis'in
            // parmak hareketini taklit etmesi mobilde takılma hissi yaratıyor.
            syncTouch: false,
          });

          let kare = 0;
          const raf = (time: number) => {
            kare++;
            lenis?.raf(time);
            rafId = requestAnimationFrame(raf);
          };
          rafId = requestAnimationFrame(raf);

          /**
           * Güvenlik ağı — kaydırmanın kilitlenmesini önler.
           *
           * Lenis tekerlek olayını ele geçirip sayfayı kendi döngüsünde
           * kaydırır. Döngü herhangi bir sebeple ilerlemezse (arka plandaki
           * sekme, kısıtlı/gömülü tarayıcı, aşırı yük) tekerlek yakalanmaya
           * devam eder ama sayfa hiç kaymaz; ziyaretçi siteye sıkışır.
           * Kısa bir süre sonra kare sayısını ölçüp döngü çalışmıyorsa
           * Lenis'i tamamen kaldırıyor ve tarayıcının kendi kaydırmasına
           * dönüyoruz: yumuşaklık kaybolur ama site kullanılabilir kalır.
           */
          saglikZamanlayici = setTimeout(() => {
            if (kare < ASGARI_KARE) {
              durdur();
              console.warn(
                "Yumuşak kaydırma kapatıldı: animasyon döngüsü ilerlemiyor."
              );
            }
          }, KONTROL_ANI);
        })
        .catch(() => {
          console.warn("Lenis yüklenemedi, yumuşak kaydırma devre dışı.");
        });
    };

    baslat();

    return () => {
      iptal = true;
      durdur();
    };
  }, []);

  return <>{children}</>;
}
