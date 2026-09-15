"use client";

import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const kapatRef = useRef<HTMLButtonElement>(null);
  const seritRef = useRef<HTMLDivElement>(null);
  const dokunusX = useRef<number | null>(null);

  const git = useCallback(
    (yon: number) => {
      if (index === null) return;
      onIndexChange((index + yon + images.length) % images.length);
    },
    [index, images.length, onIndexChange]
  );

  /* Klavye: ← → gezinme, Esc kapatma */
  useEffect(() => {
    if (!acik) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") git(1);
      else if (e.key === "ArrowLeft") git(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [acik, git, onClose]);

  /* Arka planın kaymasını engelle */
  useEffect(() => {
    if (!acik) return;
    const eski = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = eski;
    };
  }, [acik]);

  /* Açılışta odağı kapat düğmesine taşı (klavye kullanıcıları için) */
  useEffect(() => {
    if (acik) kapatRef.current?.focus();
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
      data-lenis-prevent
      className="fixed inset-0 z-[9500] bg-black/95 backdrop-blur-sm flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — görsel görüntüleyici` : "Görsel görüntüleyici"}
    >
          {/* Üst çubuk */}
          <div className="flex items-center justify-between px-5 sm:px-8 h-16 shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-primary text-sm tracking-widest tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-white/30 text-xs tabular-nums">
                / {String(images.length).padStart(2, "0")}
              </span>
              {title && (
                <span className="hidden sm:block text-white/50 text-xs tracking-wide ml-3">
                  {title}
                </span>
              )}
            </div>

            <button
              ref={kapatRef}
              onClick={onClose}
              aria-label="Kapat"
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
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
              src={images[index]}
              alt={`${title ?? "Proje"} — ${index + 1}. görsel`}
              className="lightbox-gorsel max-h-full max-w-full object-contain select-none"
              draggable={false}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => git(-1)}
                  aria-label="Önceki görsel"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => git(1)}
                  aria-label="Sonraki görsel"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-colors"
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
                  aria-label={`${i + 1}. görsele git`}
                  aria-current={i === index}
                  className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 overflow-hidden border transition-all ${
                    i === index
                      ? "border-primary opacity-100"
                      : "border-white/15 opacity-45 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
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
