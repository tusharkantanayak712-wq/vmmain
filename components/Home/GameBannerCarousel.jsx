"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
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

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-6 px-4 select-none">
      <div
        className="relative overflow-hidden rounded-[2.5rem] h-[220px] sm:h-[340px] md:h-[440px] bg-neutral-900 group shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* IMAGE LAYER */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
            {/* SOFT VIGNETTE */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* CONTENT LAYER */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl pointer-events-auto"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
                {banner.bannerTitle}
              </h2>
              {banner.bannerSummary && (
                <p className="text-sm sm:text-base text-white/80 font-medium mb-8 max-w-lg leading-relaxed line-clamp-2">
                  {banner.bannerSummary}
                </p>
              )}
              {banner.bannerLink && (
                <a
                  href={banner.bannerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-white/90 font-bold hover:text-white transition-all group/link"
                >
                  <span className="text-sm tracking-widest uppercase">Explore Now</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover/link:bg-[var(--accent)] group-hover/link:scale-110 transition-all">
                    <FiArrowRight size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLS: ARROWS (Hover Only) */}
        {banners.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all pointer-events-auto"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all pointer-events-auto"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}

        {/* CONTROLS: PAGINATION DOTS */}
        <div className="absolute bottom-8 right-8 flex gap-2.5 z-20">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              className="relative group py-2"
            >
              <div
                className={`h-1.5 transition-all duration-500 rounded-full ${current === idx ? "w-8 bg-white" : "w-1.5 bg-white/30 group-hover:bg-white/50"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* TOP ACCENT BAND (Subtle Color Cue) */}
        <div
          className="absolute top-0 left-0 h-1 z-30 transition-all duration-[5000ms] ease-linear"
          style={{
            width: isPaused ? '0%' : '100%',
            background: 'var(--accent)',
            opacity: 0.8
          }}
          key={current}
        />
      </div>
    </div>
  );
}


