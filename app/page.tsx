import HeroSection from "@/components/home/HeroSection";
import IntroStatement from "@/components/home/IntroStatement";
import ProcessScroll from "@/components/home/ProcessScroll";
import RoomCategories from "@/components/home/RoomCategories";
import CabinetSection from "@/components/home/cabinet/CabinetSection";
import CompareSection from "@/components/home/CompareSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import InstagramCta from "@/components/home/InstagramCta";

/** Ana sayfa akışı (ayrıntılar: docs/TASARIM-PLANI.md §4.2). */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroStatement />
      <ProcessScroll />
      <RoomCategories />
      <CabinetSection />
      <CompareSection />
      <FeaturedProjects />
      <StatsSection />
      <InstagramCta />
    </>
  );
}
