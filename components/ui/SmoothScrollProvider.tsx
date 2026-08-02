"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Sağlık kontrolünün yapılacağı an (ms). */
const KONTROL_ANI = 1200;
/** Bu süre içinde beklenen en az kare sayısı. Altındaysa döngü çalışmıyordur. */
const ASGARI_KARE = 10;

type LenisOrnegi = {
  raf: (t: number) => void;
  destroy: () => void;
  scrollTo: (hedef: number, secenek?: { immediate?: boolean }) => void;
};

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  /** Sayfa değişiminde kaydırmayı sıfırlayabilmek için örneğe erişim. */
  const lenisRef = useRef<LenisOrnegi | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let iptal = false;
    let rafId: number | undefined;
    let saglikZamanlayici: ReturnType<typeof setTimeout> | undefined;
    let lenis: LenisOrnegi | undefined;

    const durdur = () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      rafId = undefined;
      if (saglikZamanlayici) clearTimeout(saglikZamanlayici);
      saglikZamanlayici = undefined;
      lenis?.destroy();
      lenis = undefined;
      lenisRef.current = null;
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

          lenisRef.current = lenis;

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

  /**
   * Yeni sayfa her zaman en üstten açılır.
   *
   * Next.js sayfa geçişinde kaydırmayı kendisi sıfırlar, ancak Lenis
   * kaydırma konumunu kendi içinde tuttuğu için bu sıfırlama eziliyordu ve
   * yeni sayfa bir önceki sayfanın kaldığı yerden açılıyordu. Burada hem
   * Lenis'in kendi konumu hem de tarayıcının konumu sıfırlanır.
   *
   * `immediate: true` — geçiş yumuşatılmaz; sayfa doğrudan tepeden başlar.
   */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
