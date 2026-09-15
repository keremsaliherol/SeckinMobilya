"use client";

import { FadeInUp } from "@/components/ui/animations";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { useLang } from "@/contexts/LanguageContext";

/**
 * Çizim / uygulama karşılaştırması.
 *
 * Görseller süreç videosunun ilk ve son karesi (public/surec/). İki kare
 * aynı kamera açısından ve hizalı; çizgiler uygulamanın üstüne birebir
 * oturuyor (Faz 3'te kenar eşleştirmesiyle doğrulandı).
 */
export default function CompareSection() {
  const { t } = useLang();
  const c = t.home.compare;

  return (
    <section className="bg-surface py-24 lg:py-36">
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <FadeInUp className="lg:col-span-5">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
            {c.eyebrow}
          </p>
          <h2 className="max-w-[16ch] font-heading text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.02] text-foreground">
            {c.title}
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted">{c.desc}</p>
          <p className="mt-10 max-w-[40ch] border-l border-brand/40 pl-5 text-[15px] leading-relaxed text-foreground/80">
            {c.note}
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1} className="lg:col-span-6 lg:col-start-7">
          {/* Kapsül tepeli çerçeve: logodaki kapsülün üst yarısı */}
          <BeforeAfterSlider
            before={{ src: "/surec/cizim.webp", alt: `${c.eyebrow}: ${c.before}` }}
            after={{ src: "/surec/uygulama.webp", alt: `${c.eyebrow}: ${c.after}` }}
            beforeLabel={c.before}
            afterLabel={c.after}
            handleLabel={c.handle}
            className="mx-auto aspect-[9/13] w-full max-w-[34rem] rounded-t-full"
          />
        </FadeInUp>
      </div>
    </section>
  );
}
