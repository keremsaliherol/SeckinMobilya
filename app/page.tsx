import HeroSection from "@/components/home/HeroSection";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import AboutTeaser from "@/components/home/AboutTeaser";
import StatsSection from "@/components/home/StatsSection";
import CtaBanner from "@/components/home/CtaBanner";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <ServicesTeaser />
      <FeaturedProjects />
      <MarqueeStrip dark />
      <StatsSection />
      <AboutTeaser />
      <CtaBanner />
    </>
  );
}
