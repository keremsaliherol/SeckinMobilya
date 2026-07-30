import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import AboutTeaser from "@/components/home/AboutTeaser";
import StatsSection from "@/components/home/StatsSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip dark />
      <ServicesTeaser />
      <FeaturedProjects />
      <AboutTeaser />
      <StatsSection />
      <CtaBanner />
    </>
  );
}
