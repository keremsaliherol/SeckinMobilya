"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

/**
 * Proje görselleri ızgarası.
 *
 * Izgarada kapak görseli tekrar gösterilmez (sayfanın başında zaten tam
 * genişlikte duruyor), ancak büyütülmüş görünümde tüm görseller arasında
 * gezinilebilir — bu yüzden Lightbox'a listenin tamamı verilir.
 */
export default function ProjectGallery({
  images,
  title,
  heading,
}: {
  images: string[];
  title: string;
  heading: string;
}) {
  const [acikSira, setAcikSira] = useState<number | null>(null);
  const izgara = images.slice(1);

  if (izgara.length === 0) return null;

  return (
    <section className="pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-baseline justify-between gap-6 mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">{heading}</h2>
          <span className="text-xs text-muted tracking-widest uppercase tabular-nums">
            {images.length} görsel
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {izgara.map((img, i) => (
            <button
              key={i}
              onClick={() => setAcikSira(i + 1)}
              aria-label={`${i + 2}. görseli büyüt`}
              className="group relative overflow-hidden aspect-[4/3] border border-border hover:border-primary/60 transition-colors cursor-pointer"
            >
              <img
                src={img}
                alt={`${title} — ${i + 2}. görsel`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-11 h-11 border border-primary/70 bg-background/60 backdrop-blur-sm flex items-center justify-center text-primary">
                  <Expand size={18} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        index={acikSira}
        onClose={() => setAcikSira(null)}
        onIndexChange={setAcikSira}
        title={title}
      />
    </section>
  );
}
