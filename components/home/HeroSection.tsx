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
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const transitioningRef = useRef(false);

  const goNext = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
      transitioningRef.current = false;
      setTransitioning(false);
    }, 400);
  }, []);

  const goPrev = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + slides.length) % slides.length);
      transitioningRef.current = false;
      setTransitioning(false);
    }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const slide = slides[current];
  const words = slide.title.split(" ");

  return (
    <section className="grain relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-primary-dark">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-white/70 border border-white/30 px-3 py-1.5 rounded mb-6">
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
                className="bg-primary text-white font-medium px-8 py-3.5 rounded hover:bg-primary-dark transition-colors"
              >
                {t.hero.cta1}
              </Link>
              <Link
                href="/iletisim"
                className="border border-white/50 text-white font-medium px-8 py-3.5 rounded hover:bg-white/10 transition-colors"
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
          className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!transitioning) {
                  setTransitioning(true);
                  setTimeout(() => {
                    setCurrent(i);
                    setTransitioning(false);
                  }, 400);
                }
              }}
              className={`h-0.5 transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
