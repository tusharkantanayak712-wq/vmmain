"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

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
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % banners.length);
    }, 5000);
    return () => clearInterval(id);
  }, [banners.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
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

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8 px-4 select-none">
      <div className="relative overflow-hidden rounded-3xl h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] group shadow-2xl">

        {/* ANIMATED BACKGROUND */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            <Link href={banner.bannerLink || "/"} className="absolute inset-0">
              <Image
                src={imageSrc}
                alt={banner.bannerTitle || "Game banner"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

        {/* CONTENT */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* FEATURED BADGE */}
          <motion.div
            className="mb-4 px-4 py-1.5 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/50 backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="text-[var(--accent)] text-xs md:text-sm font-bold uppercase tracking-wider">
              Featured
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl mb-4 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {banner.bannerTitle || "Discover New Offers"}
          </motion.h2>

          {/* SUBTITLE */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-white/90 mb-6 max-w-2xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Fast delivery • Secure payments • 24/7 support
          </motion.p>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <Link href={banner.bannerLink || "/"}>
              <motion.button
                className="group/btn px-8 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-purple-500 text-white font-bold text-sm md:text-base shadow-2xl flex items-center gap-3"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Now</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiPlay className="fill-current" size={18} />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* NAVIGATION ARROWS */}
        {banners.length > 1 && (
          <>
            <motion.button
              onClick={goPrev}
              aria-label="Previous banner"
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={24} />
            </motion.button>

            <motion.button
              onClick={goNext}
              aria-label="Next banner"
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </>
        )}

        {/* PROGRESS INDICATORS */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="relative h-1.5 rounded-full overflow-hidden"
                whileHover={{ scale: 1.2 }}
                style={{ width: i === current ? 40 : 24 }}
              >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
                {i === current && (
                  <motion.div
                    className="absolute inset-0 bg-[var(--accent)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}

        {/* SLIDE COUNTER */}
        <motion.div
          className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          {current + 1} / {banners.length}
        </motion.div>
      </div>
    </div>
  );
}
