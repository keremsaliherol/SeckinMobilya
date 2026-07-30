"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const slideImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=90",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=90",
];

export default function HeroSection() {
  const { t } = useLang();
  const slides = t.hero.slides.map((s, i) => ({ ...s, image: slideImages[i] }));
  const slideCount = slides.length;
  const [current, setCurrent] = useState(0);
  const transitioningRef = useRef(false);

  const goTo = useCallback((next: (c: number) => number) => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setTimeout(() => {
      setCurrent(next);
      transitioningRef.current = false;
    }, 400);
  }, []);

  const goNext = useCallback(
    () => goTo((c) => (c + 1) % slideCount),
    [goTo, slideCount]
  );

  const goPrev = useCallback(
    () => goTo((c) => (c - 1 + slideCount) % slideCount),
    [goTo, slideCount]
  );

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const slide = slides[current];
  const words = slide.title.split(" ");

  return (
    <section className="grain relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-background">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            key={`${i}-${current}`}
            src={s.image}
            alt={s.title}
            className={`w-full h-full object-cover ${i === current ? "ken-burns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-8">
              <span className="w-10 h-px bg-primary" />
              {slide.tag}
            </span>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
              {words.map((word, i) => (
                <span key={i} className="inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projelerimiz"
                className="bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
              >
                {t.hero.cta1}
              </Link>
              <Link
                href="/iletisim"
                className="border border-white/40 text-white font-medium px-8 py-3.5 hover:border-primary hover:text-primary transition-colors"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6">
        <button
          onClick={goPrev}
          aria-label="Önceki görsel"
          className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/80 hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(() => i)}
              aria-label={`${i + 1}. görsele git`}
              aria-current={i === current}
              className={`h-0.5 transition-all duration-300 ${
                i === current ? "w-8 bg-primary" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          aria-label="Sonraki görsel"
          className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/80 hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <a
        href="#content"
        className="absolute bottom-8 right-12 z-10 hidden lg:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Keşfet</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
