"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/** Görünürlük gözlemcisi haber vermezse devreye girecek yedek süre (ms). */
const FALLBACK_MS = 700;
/** Animasyonun bitmiş olması gereken an; sonrasında içerik koşulsuz görünür. */
const ZORLA_MS = 2000;

/**
 * Öğe ekrana girdiğinde `gorunur` değerini true yapar.
 *
 * Neden hazır `whileInView` yerine bu var: `whileInView`, IntersectionObserver
 * hiç tetiklenmezse öğeyi başlangıç durumunda (opacity: 0) sonsuza kadar bırakır
 * ve içerik görünmez olur. Burada kısa bir güvenlik zamanlayıcısı var — gözlemci
 * beklenen sürede haber vermezse içerik yine de gösterilir.
 *
 * İlke: animasyon bir süstür, içeriğin görünürlüğü ona bağlı olamaz.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [gorunur, setGorunur] = useState(false);
  const [zorla, setZorla] = useState(false);

  useEffect(() => {
    let tamam = false;
    const goster = () => {
      if (tamam) return;
      tamam = true;
      setGorunur(true);
    };

    const el = ref.current;
    let io: IntersectionObserver | undefined;

    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (girisler) => {
          if (girisler.some((g) => g.isIntersecting)) {
            goster();
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      io.observe(el);
    }

    // Gözlemci kurulamadıysa ya da hiç haber vermezse içerik yine de görünür.
    const zamanlayici = setTimeout(goster, FALLBACK_MS);

    /**
     * Son güvence. Animasyon motoru ilerlemezse (arka plandaki sekme, kısıtlı
     * tarayıcı) öğe opacity:0'da donup kalıcı olarak görünmez olurdu. Bu süre
     * sonunda içerik, animasyonun durumundan bağımsız olarak görünür kılınır.
     */
    const zorlaZamanlayici = setTimeout(() => setZorla(true), ZORLA_MS);

    return () => {
      clearTimeout(zamanlayici);
      clearTimeout(zorlaZamanlayici);
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
