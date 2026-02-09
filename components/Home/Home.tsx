import HeroSection from "./HeroSection";
import Maintenance from "@/components/Maintenance/Maintenance";
import { FEATURE_FLAGS } from "@/lib/config";

export default function HomeSection() {
  return (
    <main>
      <HeroSection />
      {/* <HomeContent /> */}

      {/* Maintenance Mode Overlay */}
      {FEATURE_FLAGS.MAINTENANCE_MODE && <Maintenance />}
    </main>
  );

}
