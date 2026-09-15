import HeroSection from "@/components/home/HeroSection";
import IntroStatement from "@/components/home/IntroStatement";
import RoomCategories from "@/components/home/RoomCategories";
import CompareSection from "@/components/home/CompareSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import InstagramCta from "@/components/home/InstagramCta";

/**
 * Ana sayfa akışı. Plan (docs/TASARIM-PLANI.md) sonraki fazlarda iki bölüm
 * daha ekleyecek:
 *   Faz 4 — "Çizimden gerçeğe" kaydırmalı video: IntroStatement'tan sonra
 *   Faz 5 — 3D dolap anatomisi: RoomCategories'ten sonra
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroStatement />
      <RoomCategories />
      <CompareSection />
      <FeaturedProjects />
      <StatsSection />
      <InstagramCta />
    </>
  );
}
