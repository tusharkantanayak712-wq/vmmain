"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import Maintenance from "@/components/Maintenance/Maintenance";
import { FEATURE_FLAGS } from "@/lib/config";

const SocialFloat = dynamic(() => import("@/components/SocialFloat/SocialFloat"), {
  ssr: false, // Client side only component
});

export default function HomeSection() {
  const [isMaintenance, setIsMaintenance] = useState(FEATURE_FLAGS.MAINTENANCE_MODE);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // 1. Check DB for Maintenance Mode
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.success && data.settings?.maintenanceMode !== undefined) {
          setIsMaintenance(data.settings.maintenanceMode);
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      }
    };

    // 2. Check if current user is owner (to bypass maintenance)
    const checkRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.user?.userType === "owner") {
          setIsOwner(true);
        }
      } catch (err) {
        console.error("Failed to check role:", err);
      }
    };

    fetchSettings();
    checkRole();
  }, []);

  return (
    <main>
      <HeroSection />
      {/* <HomeContent /> */}

      <SocialFloat />

      {/* Maintenance Mode Overlay (Bypassed if user is owner) */}
      {(isMaintenance && !isOwner) && <Maintenance />}
    </main>
  );
}

