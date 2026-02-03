"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

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

  /* ================= TIMER LOGIC ================= */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (banners.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % banners.length);
    }, SLIDE_DURATION);
  }, [banners.length, isPaused]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer, current]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const jumpTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  if (loading) return <Loader />;
  if (!banners.length) return null;

  const banner = banners[current];
  const imageSrc =
    typeof banner.bannerImage === "string" && banner.bannerImage
      ? banner.bannerImage
      : logo;

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6 px-4 select-none">
      <div
        className="relative overflow-hidden rounded-2xl h-[220px] sm:h-[320px] md:h-[420px] group shadow-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
              x: { type: "tween", duration: 0.5, ease: "easeInOut" },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0"
          >
            <Image
              src={imageSrc}
              alt={banner.bannerTitle || "Game banner"}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* BASIC GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* CONTENT — ONLY TITLE */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex items-end">
          <motion.h2
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg"
          >
            {banner.bannerTitle}
          </motion.h2>
        </div>

        {/* ARROWS — ONLY ON HOVER */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}


      </div>
    </div>
  );
}
