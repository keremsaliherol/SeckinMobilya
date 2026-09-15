"use client";

import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { kaydirmayiKilitle } from "@/components/ui/SmoothScrollProvider";
import { useLang } from "@/contexts/LanguageContext";
import { duyarli } from "@/lib/gorsel";

const ODAKLANABILIR = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

interface LightboxProps {
  images: string[];
  /** Açık olan görselin sırası; null ise kapalı. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  title?: string;
}

export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
  title,
}: LightboxProps) {
  const acik = index !== null;
  const { t } = useLang();
  const l = t.lightbox;
  const kapatRef = useRef<HTMLButtonElement>(null);
  const kutuRef = useRef<HTMLDivElement>(null);
  const seritRef = useRef<HTMLDivElement>(null);
  const dokunusX = useRef<number | null>(null);

  const git = useCallback(
    (yon: number) => {
      if (index === null) return;
      onIndexChange((index + yon + images.length) % images.length);
    },
    [index, images.length, onIndexChange]
  );

  /* Klavye: ← → gezinme, Esc kapatma, Tab görüntüleyicinin içinde döner */
  useEffect(() => {
    if (!acik) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") git(1);
      else if (e.key === "ArrowLeft") git(-1);
      else if (e.key === "Tab" && kutuRef.current) {
        const ogeler = [...kutuRef.current.querySelectorAll<HTMLElement>(ODAKLANABILIR)];
        if (ogeler.length === 0) return;
        const ilk = ogeler[0];
        const son = ogeler[ogeler.length - 1];
        if (e.shiftKey && document.activeElement === ilk) {
          e.preventDefault();
          son.focus();
        } else if (!e.shiftKey && document.activeElement === son) {
          e.preventDefault();
          ilk.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [acik, git, onClose]);

  /* Arka planın kaymasını engelle (body taşması + Lenis) */
  useEffect(() => {
    if (!acik) return;
    kaydirmayiKilitle(true);
    return () => kaydirmayiKilitle(false);
  }, [acik]);

  /* Açılışta odak kapat düğmesine gider; kapanınca görüntüleyiciyi açan öğeye döner */
  useEffect(() => {
    if (!acik) return;
    const onceki = document.activeElement as HTMLElement | null;
    kapatRef.current?.focus();
    return () => onceki?.focus({ preventScroll: true });
  }, [acik]);

  /* Komşu görselleri önden indir — geçişler beklemesiz olsun */
  useEffect(() => {
    if (index === null) return;
    [1, -1].forEach((yon) => {
      const img = new window.Image();
      img.src = images[(index + yon + images.length) % images.length];
    });
  }, [index, images]);

  /* Etkin küçük resmi görünür tut */
  useEffect(() => {
    if (index === null || !seritRef.current) return;
    const aktif = seritRef.current.querySelector<HTMLElement>(`[data-sira="${index}"]`);
    aktif?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  if (!acik) return null;

  return (
    <div
      ref={kutuRef}
      data-lenis-prevent
      data-koyu-zemin
      className="fixed inset-0 z-[9500] bg-shade/95 backdrop-blur-sm flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — ${l.viewer}` : l.viewer}
    >
          {/* Üst çubuk */}
          <div className="flex items-center justify-between px-5 sm:px-8 h-16 shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-accent text-sm tracking-widest tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-white/60 text-xs tabular-nums">
                / {String(images.length).padStart(2, "0")}
              </span>
              {title && (
                <span className="hidden sm:block text-white/70 text-xs tracking-wide ml-3">
                  {title}
                </span>
              )}
            </div>

            <button
              ref={kapatRef}
              onClick={onClose}
              aria-label={l.close}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Görsel alanı */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20"
            onClick={(e) => {
              // Boşluğa tıklanınca kapat, görselin kendisine tıklanınca kapatma
              if (e.target === e.currentTarget) onClose();
            }}
            onTouchStart={(e) => {
              dokunusX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (dokunusX.current === null) return;
              const fark = e.changedTouches[0].clientX - dokunusX.current;
              if (Math.abs(fark) > 50) git(fark < 0 ? 1 : -1);
              dokunusX.current = null;
            }}
          >
            {/* key değişince öğe yeniden mount olur ve CSS giriş animasyonu
                baştan çalışır — geçiş efekti bundan ibaret. */}
            <img
              key={index}
              {...duyarli(images[index], "100vw")}
              alt={`${title ? `${title} — ` : ""}${l.image.replace("{n}", String(index + 1))}`}
              className="lightbox-gorsel max-h-full max-w-full object-contain select-none"
              draggable={false}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => git(-1)}
                  aria-label={l.prev}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 border border-white/20 bg-shade/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => git(1)}
                  aria-label={l.next}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 border border-white/20 bg-shade/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Küçük resim şeridi */}
          {images.length > 1 && (
            <div
              ref={seritRef}
              className="shrink-0 flex gap-2 overflow-x-auto px-5 sm:px-8 py-4 border-t border-white/10"
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  data-sira={i}
                  onClick={() => onIndexChange(i)}
                  aria-label={l.goTo.replace("{n}", String(i + 1))}
                  aria-current={i === index}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden border transition-all ${
                    i === index
                      ? "border-accent opacity-100"
                      : "border-white/15 opacity-45 hover:opacity-80"
                  }`}
                >
                  <img
                    {...duyarli(img, "5rem")}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
      )}
    </div>
  );
}
