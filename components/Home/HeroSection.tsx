"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Critical components stay static
import GameBannerCarousel from "./GameBannerCarousel";
import TopNoticeBanner from "./TopNoticeBanner";
import HomeQuickAction from "./HomeQuickAction";

// Non-critical components move to dynamic imports
const FlashSale = dynamic(() => import("./FlashSale"), {
  loading: () => <div className="h-40 animate-pulse bg-gray-800 rounded-xl my-4 mx-4" />,
  ssr: true
});

const HomeServices = dynamic(() => import("./HomeServices"), {
  loading: () => <div className="h-32 animate-pulse bg-gray-800 rounded-xl my-4 mx-4" />,
  ssr: true
});

const TrustHighlights = dynamic(() => import("./TrustHighlights"), {
  loading: () => <div className="h-32 animate-pulse bg-gray-800 rounded-xl my-4 mx-4" />,
  ssr: true
});

const ScrollingNoticeBand = dynamic(() => import("./ScrollingNoticeBand"), {
  ssr: false // Client side animation usually
});

const GamesPage = dynamic(() => import("@/app/games/page"), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-[3/4] animate-pulse bg-gray-900 rounded-lg" />
      ))}
    </div>
  ),
  ssr: true
});

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const isLive = pathname.startsWith("/anime-live");

  return (
    <>
      <TopNoticeBanner />
      <GameBannerCarousel />
      <HomeQuickAction />
      <FlashSale />

      <ScrollingNoticeBand />
      <GamesPage />
      <ScrollingNoticeBand />

      <HomeServices />
      <TrustHighlights />
    </>
  );
}

