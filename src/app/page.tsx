import HeroSection from "@/components/HeroSection";
import WeightlessEngineering from "@/components/WeightlessEngineering";
import TheConnection from "@/components/TheConnection";
import HeritageSlider from "@/components/HeritageSlider";
import FooterCallToAction from "@/components/FooterCallToAction";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-asphalt text-chrome selection:bg-guards-red/40 selection:text-chrome">
      <HeroSection />
      <WeightlessEngineering />
      <TheConnection />
      <HeritageSlider />
      <FooterCallToAction />
    </main>
  );
}
