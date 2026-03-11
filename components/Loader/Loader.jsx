"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ElegantLoader() {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--background)]">
      {/* Subtle Ambient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--accent)]/5 rounded-full blur-[80px]" />
      </motion.div>

      {/* Main Assembly */}
      <div className="relative flex flex-col items-center">
        {/* Minimalist Spinner / Ring */}
        <div className="relative w-16 h-16 mb-8">
          {/* Static Track Ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-[var(--accent)]/10" />

          {/* Animated Drawing Ring */}
          <svg className="w-full h-full -rotate-90">
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.8, 0],
                rotate: [0, 360],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.2, // Faster duration
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>

          {/* Central Pulsating Dot */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]"
          />
        </div>

        {/* Elegant Brand Section */}
        <div className="flex flex-col items-center gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-bold tracking-[0.3em] text-[var(--foreground)] uppercase"
          >
            Vampettic
          </motion.h1>

          <div className="flex items-center gap-2 opacity-50">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]"
            />
            <span className="text-[8px] text-[var(--muted)] font-black uppercase tracking-[0.2em]">
              Loading...
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

