"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const separator = <span className="mx-6 text-primary opacity-60">✶</span>;

function Track({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const content = Array.from(items).flatMap((item, i) => [
    <span key={`item-${i}`} className="whitespace-nowrap font-heading font-semibold tracking-[0.2em] uppercase text-sm">
      {item}
    </span>,
    <span key={`sep-${i}`}>{separator}</span>,
  ]);

  return (
    <motion.div
      className="flex items-center gap-0"
      animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
      transition={{ duration: 28, ease: "linear", repeat: Infinity }}
    >
      {content}
      {content}
    </motion.div>
  );
}

export default function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const { t } = useLang();
  return (
    <div
      className={`overflow-hidden py-4 border-y ${
        dark
          ? "bg-surface border-border text-primary/70"
          : "bg-background border-border text-foreground/35"
      }`}
    >
      <Track items={t.marquee} />
    </div>
  );
}
