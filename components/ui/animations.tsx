"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { introSonrasi } from "@/components/ui/Intro";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Sayfa çizilmeye başladıktan sonra gözlemci bu sürede ilk haberini vermezse bozuk sayılır (ms). */
const FALLBACK_MS = 700;
/** Sayfa hiç çizilmese bile en geç bu süre sonunda içerik gösterilir (ms). */
const AZAMI_BEKLEME_MS = 4000;
/** Belirme başladıktan sonra animasyonun bitmiş olması gereken süre; sonra içerik koşulsuz görünür. */
const ZORLA_MS = 2000;

/** Sayfanın ilk karesinin çizildiği an (tüm öğeler için tek ölçüm). */
let ilkKareZamani: number | undefined;
let ilkKareIstendi = false;
function ilkKareyiOlc() {
  if (ilkKareIstendi) return;
  ilkKareIstendi = true;
  requestAnimationFrame(() => {
    ilkKareZamani = performance.now();
  });
}

/**
 * Öğe ekrana girdiğinde `gorunur` değerini true yapar.
 *
 * Neden hazır `whileInView` yerine bu var: `whileInView`, IntersectionObserver
 * hiç tetiklenmezse öğeyi başlangıç durumunda (opacity: 0) sonsuza kadar bırakır
 * ve içerik görünmez olur. Buradaki güvenlik ağları yalnızca gerçekten bir şey
 * bozulduğunda devreye girer:
 *
 * - Gözlemci gözlemeye başlayınca ilk çizimde bir ilk haber verir (öğe ekranda
 *   olmasa da). Sayfa çizilmeye başladığı hâlde bu haber gelmezse gözlemci
 *   bozuktur, içerik gösterilir. Eskiden zamanlayıcı koşulsuz çalışıyordu:
 *   ekranın altındaki öğeler de 700 ms sonra belirip bitiyor, aşağı
 *   inildiğinde animasyon görünmüyordu.
 * - Sayfa henüz çizilmediyse (stil dosyası geç geliyor, dev sunucusu derliyor)
 *   haber gelmemesi normaldir; en fazla AZAMI_BEKLEME_MS beklenir.
 * - Arka plandaki sekmede gözlemci haber vermez; bu da normaldir. Süre sekme
 *   görünür olunca yeniden başlar.
 * - Açılış perdesi açıksa belirme perde kalkarken başlar; yoksa animasyon
 *   perdenin arkasında oynayıp biterdi.
 * - Belirme başladıktan sonra animasyon motoru ilerlemezse `zorla` içeriği
 *   görünür kılar (globals.css, data-zorla).
 *
 * İlke: animasyon bir süstür, içeriğin görünürlüğü ona bağlı olamaz.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [gorunur, setGorunur] = useState(false);
  const [zorla, setZorla] = useState(false);

  useEffect(() => {
    let tamam = false;
    let haberGeldi = false;
    let yedek: ReturnType<typeof setTimeout> | undefined;
    let zorlaZamanlayici: ReturnType<typeof setTimeout> | undefined;
    let introIptal = () => {};

    const goster = () => {
      if (tamam) return;
      tamam = true;
      introIptal = introSonrasi(() => {
        setGorunur(true);
        zorlaZamanlayici = setTimeout(() => setZorla(true), ZORLA_MS);
      });
    };

    const el = ref.current;
    let io: IntersectionObserver | undefined;

    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (girisler) => {
          haberGeldi = true;
          if (girisler.some((g) => g.isIntersecting)) {
            goster();
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    }

    // Gözlemci kurulamadıysa ya da ilk haberini hiç vermediyse içerik yine de görünür.
    ilkKareyiOlc();
    let beklemeBasi = performance.now();
    const yedekKontrol = () => {
      if (haberGeldi || document.hidden) return;
      const simdi = performance.now();
      const cizimdenBeri = ilkKareZamani === undefined ? 0 : simdi - ilkKareZamani;
      if (cizimdenBeri >= FALLBACK_MS || simdi - beklemeBasi >= AZAMI_BEKLEME_MS) goster();
      else yedek = setTimeout(yedekKontrol, 250);
    };
    const yedekKur = () => {
      clearTimeout(yedek);
      if (document.hidden || haberGeldi) return;
      beklemeBasi = performance.now();
      yedek = setTimeout(yedekKontrol, FALLBACK_MS);
    };
    yedekKur();
    document.addEventListener("visibilitychange", yedekKur);

    return () => {
      clearTimeout(yedek);
      clearTimeout(zorlaZamanlayici);
      document.removeEventListener("visibilitychange", yedekKur);
      introIptal();
      io?.disconnect();
    };
  }, []);

  return { ref, gorunur, zorla };
}

type AnimProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Ortak kayma+belirme animasyonu; yön x/y ile verilir. */
function Reveal({
  children,
  delay = 0,
  className = "",
  x = 0,
  y = 0,
  duration = 0.7,
}: AnimProps & { x?: number; y?: number; duration?: number }) {
  const { ref, gorunur, zorla } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-reveal
      data-zorla={zorla}
      initial={{ opacity: 0, x, y }}
      animate={gorunur ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── FadeInUp ─────────────────────────────────── */
export function FadeInUp(props: AnimProps) {
  return <Reveal {...props} y={40} />;
}

/* ─── FadeIn ────────────────────────────────────── */
export function FadeIn(props: AnimProps) {
  return <Reveal {...props} duration={0.6} />;
}

/* ─── FadeInLeft ────────────────────────────────── */
export function FadeInLeft(props: AnimProps) {
  return <Reveal {...props} x={-40} />;
}

/* ─── FadeInRight ───────────────────────────────── */
export function FadeInRight(props: AnimProps) {
  return <Reveal {...props} x={40} />;
}

/* ─── ScaleIn ───────────────────────────────────── */
export function ScaleIn({ children, delay = 0, className = "" }: AnimProps) {
  const { ref, gorunur, zorla } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-reveal
      data-zorla={zorla}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={gorunur ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── RevealImage (alttan açılan maske) ─────────── */
export function RevealImage({ children, delay = 0, className = "" }: AnimProps) {
  const { ref, gorunur, zorla } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-reveal
      data-zorla={zorla}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={gorunur ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerContainer ──────────────────────────── */
export function StaggerContainer({
  children,
  className = "",
  delay = 0,
}: AnimProps) {
  const { ref, gorunur, zorla } = useReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      data-zorla={zorla}
      initial="hidden"
      animate={gorunur ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem ───────────────────────────────── */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
