// app/page.tsx
import HomeSection from "@/components/Home/Home";
import MaintenancePage from "./maintenance/page";
import SocialFloat from "@/components/SocialFloat/SocialFloat";

export const metadata = {
  title: "vamp MAIN – MLBB Diamond Top Up | Instant & Secure",
  description:
    "vamp main is a fast and secure Mobile Legends (MLBB) diamond top-up platform. Instant delivery, safe payments, and 24/7 automated service.",
  keywords: [
    "MLBB top up",
    "buy MLBB diamonds",
    "Mobile Legends recharge",
    "vamp top up",

  ],
};

export default function Page() {
  return (
    <main>
      <HomeSection />
      {/* <MaintenancePage /> */}
      <SocialFloat />
    </main>
  );
}
