"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, transform, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeInUp } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import { rooms, type Room } from "@/data/rooms";
import { duyarli } from "@/lib/gorsel";

/**
 * Izgara yerleşimi — kart sırasıyla eşleşir (data/rooms.ts).
 * Masaüstü 12 sütun: solda iki satır boyunca uzun mutfak kartı, sağda üst
 * üste iki kart; altta üç farklı genişlikte kart. Eşit üçlü sütun bilinçli
 * olarak kullanılmadı.
 */
const yerlesim = [
  "col-span-2 aspect-[4/5] lg:col-span-7 lg:row-span-2 lg:aspect-auto",
  "aspect-[3/4] lg:col-span-5 lg:aspect-[16/11]",
  "aspect-[3/4] lg:col-span-5 lg:aspect-[16/11]",
  "aspect-[3/4] lg:col-span-4 lg:aspect-auto lg:h-[30rem]",
  "aspect-[3/4] lg:col-span-3 lg:aspect-auto lg:h-[30rem]",
  "col-span-2 aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:h-[30rem]",
];

/** Kartların ekrandaki genişliği (yukarıdaki yerleşimle aynı sırada), görsel sürümü seçimi için */
const boyutlar = [
  "(min-width: 1024px) 55vw, 100vw",
  "(min-width: 1024px) 40vw, 50vw",
  "(min-width: 1024px) 40vw, 50vw",
  "(min-width: 1024px) 32vw, 50vw",
  "(min-width: 1024px) 24vw, 50vw",
  "(min-width: 1024px) 40vw, 100vw",
];

function OdaKarti({ room, index }: { room: Room; index: number }) {
  const { t } = useLang();
  const r = t.home.rooms;
  const ref = useRef<HTMLAnchorElement>(null);

  // Kart ekrana girerken hafifçe geriye yatık başlar ve düzleşir; içindeki
  // görsel ise çerçeveden daha yavaş kayar (derinlik hissi).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const egim = useTransform(scrollYProgress, transform([0, 0.35], [7, 0]));
  const gorselY = useTransform(scrollYProgress, transform([0, 1], ["-8%", "8%"]));

  return (
    <motion.div
      style={{ rotateX: egim, transformPerspective: 1400 }}
      className={`oda-karti origin-bottom ${yerlesim[index]}`}
    >
      <Link
        ref={ref}
        href={room.href}
        className="group relative block h-full w-full overflow-hidden bg-surface"
      >
        <motion.img
          {...duyarli(room.image, boyutlar[index])}
          // Kartın adı hemen altındaki başlıkta; görsel adı tekrar okutmasın
          alt=""
          loading="lazy"
          decoding="async"
          style={{ y: gorselY, scale: 1.18 }}
          className="parallax-gorsel absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-105"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-shade/75 via-shade/10 to-transparent transition-opacity duration-500 group-hover:opacity-90"
        />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5 lg:p-7">
          <span className="font-heading text-[clamp(1.2rem,2.4vw,2.4rem)] leading-[1.08] text-white">
            {r.items[room.id]}
          </span>
          {/* Dar kartlarda başlığa yer bırakmak için mobilde gizli */}
          <span className="mb-1 hidden size-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-foreground sm:inline-flex">
            <ArrowUpRight size={16} />
            <span className="sr-only">{r.view}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function RoomCategories() {
  const { t } = useLang();
  const r = t.home.rooms;

  return (
    <section className="pb-24 lg:pb-40">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <FadeInUp className="mb-12 flex flex-col gap-6 border-t border-border pt-10 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
              {r.eyebrow}
            </p>
            <h2 className="max-w-[18ch] font-heading text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.02] text-foreground">
              {r.title}
            </h2>
          </div>
          <Link
            href="/hizmetlerimiz"
            className="inline-flex items-center gap-2 self-start border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand lg:self-auto"
          >
            {r.all} <ArrowRight size={14} />
          </Link>
        </FadeInUp>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
          {rooms.map((room, i) => (
            <OdaKarti key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
