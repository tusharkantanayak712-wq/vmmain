"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

const SLIDE_DURATION = 5000;

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch("/api/game-banners")
      .then(res => res.json())
      .then(json => setBanners(json?.data || []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [banners.length, current]);

  const navigate = (dir) => {
    clearInterval(timerRef.current);
    setCurrent(prev => (prev + dir + banners.length) % banners.length);
  };

  if (loading) return <Loader />;
  if (!banners.length) return null;

  const activeBanner = banners[current];
  const imageSource = activeBanner.bannerImage || logo;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-3xl bg-neutral-900 shadow-xl group">

        {/* SLIDES */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={imageSource}
              alt={activeBanner.bannerTitle || "Banner"}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 pointer-events-none">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              {activeBanner.bannerTitle}
            </h2>
            <p className="text-sm sm:text-base text-white/80 line-clamp-2 mb-6 pointer-events-auto leading-relaxed">
              {activeBanner.bannerSummary}
            </p>
          </motion.div>
        </div>

        {/* CONTROLS */}
        {banners.length > 1 && (
          <>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <FiChevronRight size={20} />
              </button>
            </div>

            <div className="absolute bottom-6 right-8 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${current === i ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-white/30"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}



