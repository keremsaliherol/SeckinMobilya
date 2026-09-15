"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Sağlık ölçümü penceresi (ms). */
const KONTROL_ANI = 1200;
/** Bir pencerede beklenen en az kare sayısı. */
const ASGARI_KARE = 10;
/**
 * Üst üste kaç pencere başarısız olursa döngü bozuk sayılır. Tek pencere yetmez:
 * sayfa henüz çizilmemişken (stil dosyası geç geliyor, dev sunucusu derliyor)
 * ya da kısa bir yoğunlukta da kare gelmeyebilir.
 */
const AZAMI_DENEME = 3;

type LenisOrnegi = {
  raf: (t: number) => void;
  destroy: () => void;
  scrollTo: (hedef: number, secenek?: { immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
};

const KILIT_OLAYI = "seckin:kaydirma-kilidi";

/**
 * Sayfa kaydırmasını kilitler/açar (menü paneli gibi katmanlar için).
 *
 * `body { overflow: hidden }` tek başına yetmez: Lenis tekerleği yakalayıp
 * pencereyi kendisi kaydırdığı için arka plandaki sayfa kaymaya devam eder.
 * Olay, sağlayıcıdaki Lenis örneğini de durdurur.
 */
export function kaydirmayiKilitle(kilitli: boolean) {
  document.body.style.overflow = kilitli ? "hidden" : "";
  window.dispatchEvent(new CustomEvent(KILIT_OLAYI, { detail: kilitli }));
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  /** Sayfa değişiminde kaydırmayı sıfırlayabilmek için örneğe erişim. */
  const lenisRef = useRef<LenisOrnegi | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let iptal = false;
    let rafId: number | undefined;
    let saglikZamanlayici: ReturnType<typeof setTimeout> | undefined;
    let lenis: LenisOrnegi | undefined;
    /** Görünürlük değişince sağlık ölçümünü yeniden başlatan dinleyici (varsa). */
    let olcumuYenile: (() => void) | undefined;

    const olcumuBitir = () => {
      if (saglikZamanlayici) clearTimeout(saglikZamanlayici);
      saglikZamanlayici = undefined;
      if (olcumuYenile) document.removeEventListener("visibilitychange", olcumuYenile);
      olcumuYenile = undefined;
    };

    const durdur = () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      rafId = undefined;
      olcumuBitir();
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
           *
           * Ölçüm yalnızca sayfa görünürken yapılır. Arka plandaki sekmede
           * tarayıcı kareleri bilerek durdurur; eskiden site arka planda
           * açılınca (Ctrl+tık, sekme değiştirme, küçültülmüş pencere) bu
           * "bozuk" sanılıyor ve yumuşak kaydırma oturum boyunca kapanıyordu.
           * Bir kez başarılı ölçülünce bir daha ölçülmez.
           */
          const olcumBaslat = () => {
            if (saglikZamanlayici) clearTimeout(saglikZamanlayici);
            saglikZamanlayici = undefined;
            if (document.hidden) return; // görünür olunca yeniden başlar
            let deneme = 0;
            const olc = (baslangic: number) => {
              saglikZamanlayici = setTimeout(() => {
                saglikZamanlayici = undefined;
                if (document.hidden) return; // ölçüm sırasında arka plana alındı
                if (kare - baslangic >= ASGARI_KARE) {
                  olcumuBitir();
                } else if (++deneme < AZAMI_DENEME) {
                  olc(kare);
                } else {
                  durdur();
                  console.warn(
                    "Yumuşak kaydırma kapatıldı: animasyon döngüsü ilerlemiyor."
                  );
                }
              }, KONTROL_ANI);
            };
            olc(kare);
          };
          olcumuYenile = olcumBaslat;
          document.addEventListener("visibilitychange", olcumBaslat);
          olcumBaslat();
        })
        .catch(() => {
          console.warn("Lenis yüklenemedi, yumuşak kaydırma devre dışı.");
        });
    };

    baslat();

    const kilitDinle = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) lenis?.stop();
      else lenis?.start();
    };
    window.addEventListener(KILIT_OLAYI, kilitDinle);

    return () => {
      iptal = true;
      window.removeEventListener(KILIT_OLAYI, kilitDinle);
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
   *
   * Adreste bölüm işareti varsa (ör. blogdan `/#dolap`) sayfa o bölümden açılır.
   */
  useEffect(() => {
    const lenis = lenisRef.current;
    const hedef = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : null;
    const y = hedef ? hedef.getBoundingClientRect().top + window.scrollY : 0;
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  }, [pathname]);

  return <>{children}</>;
}
