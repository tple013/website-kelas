import { HeroSection } from "./components/HeroSection";
import { VisionMission } from "./components/VisionMission";

export function HomeView() {
  return (
    <div className="bg-white">
      <HeroSection />
      <VisionMission />
    </div>
  );
}