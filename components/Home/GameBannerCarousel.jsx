"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await fetch("/api/game-banners");
        const json = await res.json();
        if (active) setBanners(json?.data || []);
      } catch {
        if (active) setBanners([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => (active = false);
  }, []);

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % banners.length),
      4500
    );
    return () => clearInterval(id);
  }, [banners.length]);

  const goNext = useCallback(() => {
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  const goPrev = useCallback(() => {
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  }, [banners.length]);

  if (loading) return <Loader />;
  if (!banners.length) return null;

  const banner = banners[current];

  // SAFE IMAGE SRC
  const imageSrc =
    typeof banner.bannerImage === "string" && banner.bannerImage
      ? banner.bannerImage
      : logo;

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-8 select-none">
      <div className="relative overflow-hidden rounded-3xl h-[200px] md:h-[320px] group shadow-xl">

        {/* IMAGE */}
        <Link href={banner.bannerLink || "/"} className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={banner.bannerTitle || "Game banner"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
          />
        </Link>

        {/* SOFT OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* CENTER CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-xl md:text-3xl font-bold text-white drop-shadow">
            {banner.bannerTitle || "Discover New Offers"}
          </h2>
          <p className="text-sm md:text-base text-white/80 mt-2">
            Fast delivery • Secure payments • 24/7 support
          </p>

          <span className="mt-4 inline-block px-5 py-2 rounded-full
                           bg-[var(--accent)] text-white text-sm font-semibold">
            Explore Now
          </span>
        </div>

        {/* ARROWS (HOVER ONLY) */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous banner"
              className="absolute left-4 top-1/2 -translate-y-1/2
                         w-10 h-10 rounded-full
                         bg-black/40 text-white
                         opacity-0 group-hover:opacity-100
                         transition"
            >
              ‹
            </button>

            <button
              onClick={goNext}
              aria-label="Next banner"
              className="absolute right-4 top-1/2 -translate-y-1/2
                         w-10 h-10 rounded-full
                         bg-black/40 text-white
                         opacity-0 group-hover:opacity-100
                         transition"
            >
              ›
            </button>
          </>
        )}

        {/* INSIDE DOTS */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current
                    ? "bg-[var(--accent)] w-6"
                    : "bg-white/50 w-2 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
