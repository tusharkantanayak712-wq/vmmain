"use client";

import { motion } from "framer-motion";
import { FiZap, FiShield, FiTarget, FiBox } from "react-icons/fi";

/* ================= NOTICE CONFIG (EDIT HERE) ================= */
const NOTICE_CONFIG = {
  brandFallback: "Vampenttic",
  items: [
    {
      icon: <FiZap />,
      prefix: "Welcome to",
      highlight: "Store",
      type: "brand"
    },
    {
      icon: <FiShield />,
      highlight: "Instant",
      text: "Instant & Safe Top-Ups",
      type: "text"
    },
    {
      icon: <FiTarget />,
      highlight: "24×7",
      text: "24×7 Automated Delivery",
      type: "text"
    },
    {
      icon: <FiBox />,
      highlight: "Verified",
      text: "Verified Payment Protocol",
      type: "text"
    }
  ],
  duration: 60, // Slower for premium feel
};
/* ============================================================= */

export default function ScrollingNoticeBand() {
  const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || NOTICE_CONFIG.brandFallback;

  return (
    <div className="relative w-full overflow-hidden bg-transparent border-y border-[var(--border)]/50 py-2.5 mt-1 group">
      {/* Content Container */}
      <div className="flex whitespace-nowrap relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: NOTICE_CONFIG.duration,
            repeat: Infinity,
          }}
          className="flex items-center"
        >
          {/* Render twice for seamless loop */}
          {[...Array(2)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex">
              {NOTICE_CONFIG.items.map((item, idx) => (
                <div key={idx} className="flex items-center mx-10 sm:mx-12">
                  {/* Icon */}
                  <span className="mr-2 text-base opacity-70" style={{ color: 'var(--accent)' }}>
                    {item.icon}
                  </span>

                  {/* Text */}
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[var(--foreground)] opacity-60">
                    {item.type === "brand" ? (
                      <>
                        <span className="opacity-40">{item.prefix} </span>
                        <span style={{ color: 'var(--accent)' }} className="opacity-100">{BRAND_NAME} </span>
                        <span style={{ color: 'var(--accent)' }} className="opacity-100">{item.highlight}</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: 'var(--accent)' }} className="opacity-100">{item.highlight}</span>
                        <span className="mx-2 opacity-20">|</span>
                        <span className="font-bold">{item.text.replace(item.highlight, "").trim()}</span>
                      </>
                    )}
                  </span>

                  {/* Dot Separator */}
                  <div className="ml-10 sm:ml-12 w-1 h-1 rounded-full bg-[var(--accent)]/30" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-20" />
    </div>
  );
}
