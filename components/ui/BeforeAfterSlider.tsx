"use client";

import { useCallback, useRef, useState } from "react";

type Gorsel = { src: string; alt: string };

/**
 * Sürüklenebilir öncesi/sonrası (çizim/uygulama) karşılaştırması.
 *
 * - Fare, dokunma ve kalem tek kod yolundan (pointer events) yönetilir.
 *   `setPointerCapture` sayesinde imleç kutudan çıksa da sürükleme sürer.
 * - Klavye ve ekran okuyucu için görünmez bir `range` girdisi vardır:
 *   ok tuşlarıyla %1, Page Up/Down ile %10 kayar. Odaklandığında tutamak
 *   halkayla vurgulanır.
 * - `touch-pan-y`: mobilde dikey kaydırma sayfaya bırakılır, yatay hareket
 *   karşılaştırmayı sürükler.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  handleLabel,
  className = "",
  loading = "lazy",
}: {
  before: Gorsel;
  after: Gorsel;
  beforeLabel: string;
  afterLabel: string;
  handleLabel: string;
  /** Kutunun boyut/oran/köşe sınıfları */
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [konum, setKonum] = useState(50);
  const kutuRef = useRef<HTMLDivElement>(null);
  const suruklen = useRef(false);

  const konumuGuncelle = useCallback((clientX: number) => {
    const kutu = kutuRef.current;
    if (!kutu) return;
    const r = kutu.getBoundingClientRect();
    const yuzde = ((clientX - r.left) / r.width) * 100;
    setKonum(Math.max(0, Math.min(100, yuzde)));
  }, []);

  return (
    <div
      ref={kutuRef}
      className={`group/karsilastir relative select-none overflow-hidden touch-pan-y cursor-ew-resize bg-surface ${className}`}
      onPointerDown={(e) => {
        suruklen.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        konumuGuncelle(e.clientX);
      }}
      onPointerMove={(e) => {
        if (suruklen.current) konumuGuncelle(e.clientX);
      }}
      onPointerUp={() => (suruklen.current = false)}
      onPointerCancel={() => (suruklen.current = false)}
    >
      {/* Sonrası: tam görünür alt katman */}
      <img
        src={after.src}
        alt={after.alt}
        loading={loading}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Öncesi: tutamağın solunda kalan kısım */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - konum}% 0 0)` }}
      >
        <img
          src={before.src}
          alt={before.alt}
          loading={loading}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Etiketler */}
      <span className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-background/90 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-ink/90 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-on-ink">
        {afterLabel}
      </span>

      {/* Çizgi + kapsül tutamak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(31,23,17,0.08)]"
        style={{ left: `${konum}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-16 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full border border-white/70 bg-ink/85 text-on-ink shadow-[0_8px_24px_-8px_rgba(31,23,17,0.5)] backdrop-blur-sm transition-transform duration-300 group-active/karsilastir:scale-95 group-has-[input:focus-visible]/karsilastir:ring-2 group-has-[input:focus-visible]/karsilastir:ring-accent group-has-[input:focus-visible]/karsilastir:ring-offset-2">
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M5 1 1 5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="m1 1 4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Klavye / ekran okuyucu denetimi */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(konum)}
        onChange={(e) => setKonum(Number(e.target.value))}
        aria-label={handleLabel}
        aria-valuetext={`${beforeLabel} %${Math.round(konum)}`}
        className="sr-only"
      />
    </div>
  );
}
