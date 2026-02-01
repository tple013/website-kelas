import { HeroSection } from "./components/HeroSection";
import { VisionMission } from "./components/VisionMission";

export function HomeView() {
  return (
    <div className="bg-white dark:bg-slate-900">
      <HeroSection />
      <VisionMission />
    </div>
  );
}