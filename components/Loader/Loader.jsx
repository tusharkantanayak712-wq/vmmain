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
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full blur-[100px]" />
      </motion.div>

      {/* Main Assembly */}
      <div className="relative flex flex-col items-center">
        {/* Minimalist Spinner / Ring */}
        <div className="relative w-24 h-24 mb-12">
          {/* Static Track Ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-[var(--accent)]/10" />

          {/* Animated Drawing Ring */}
          <svg className="w-full h-full -rotate-90">
            <motion.circle
              cx="48"
              cy="48"
              r="46"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.7, 0],
                rotate: [0, 360],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>

          {/* Central Pulsating Dot */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_15px_var(--accent)]"
          />
        </div>

        {/* Elegant Brand Section */}
        <div className="flex flex-col items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-light tracking-[0.4em] text-[var(--foreground)] uppercase"
          >
            Vampettic
          </motion.h1>

          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[var(--accent)]"
            />
            <span className="text-[10px] text-[var(--muted)] font-medium uppercase tracking-[0.2em]">
              Precision Gaming
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      {/* Modern Backdrop Filter */}
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none" />
    </div>
  );
}
