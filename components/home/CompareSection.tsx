"use client";

import { FadeInUp } from "@/components/ui/animations";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { useLang } from "@/contexts/LanguageContext";

/**
 * Boş oda / bitmiş mutfak karşılaştırması.
 *
 * Görseller "boş odadan mutfağa" videosunun (assets-kaynak/bos-odadan-mutfaga.mp4)
 * ilk ve son karesi (public/surec/). Kamera sabit; iki kare hizalı (güneş
 * lekesi, pencere kenarı ve tavandaki kablo aynı yerde). Süreç bölümündeki
 * çizim → mutfak videosundan farklı bir mekân olduğu için ana sayfada aynı
 * mutfak iki kez görünmüyor.
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
            before={{ src: "/surec/bos-oda.webp", alt: c.beforeAlt }}
            after={{ src: "/surec/bitmis-mutfak.webp", alt: c.afterAlt }}
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
