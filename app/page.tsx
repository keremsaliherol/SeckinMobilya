import HeroSection from "@/components/home/HeroSection";
import IntroStatement from "@/components/home/IntroStatement";
import ProcessScroll from "@/components/home/ProcessScroll";
import RoomCategories from "@/components/home/RoomCategories";
import CompareSection from "@/components/home/CompareSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import InstagramCta from "@/components/home/InstagramCta";

/**
 * Ana sayfa akışı. Plan (docs/TASARIM-PLANI.md) Faz 5'te bir bölüm daha
 * ekleyecek: 3D dolap anatomisi, RoomCategories'ten sonra.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroStatement />
      <ProcessScroll />
      <RoomCategories />
      <CompareSection />
      <FeaturedProjects />
      <StatsSection />
      <InstagramCta />
    </>
  );
}
