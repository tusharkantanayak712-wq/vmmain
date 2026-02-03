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
  duration: 45, // Slowed down for readability
};
/* ============================================================= */

export default function ScrollingNoticeBand() {
  const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || NOTICE_CONFIG.brandFallback;

  return (
    <div className="relative w-full overflow-hidden bg-[var(--card)]/40 backdrop-blur-xl border-y border-[var(--border)] py-5 sm:py-6 mt-2 group">
      {/* Background Glows (Theme Dependent) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </div>

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
                <div key={idx} className="flex items-center mx-12 sm:mx-16">
                  {/* Icon */}
                  <span className="mr-3 text-lg" style={{ color: 'var(--accent)' }}>
                    {item.icon}
                  </span>

                  {/* Text */}
                  <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[var(--foreground)]">
                    {item.type === "brand" ? (
                      <>
                        <span className="opacity-40">{item.prefix} </span>
                        <span style={{ color: 'var(--accent)' }}>{BRAND_NAME} </span>
                        <span style={{ color: 'var(--accent)' }}>{item.highlight}</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: 'var(--accent)' }}>{item.highlight}</span>
                        <span className="mx-2 opacity-20">|</span>
                        <span className="opacity-60 font-bold">{item.text.replace(item.highlight, "").trim()}</span>
                      </>
                    )}
                  </span>

                  {/* HUD Separator */}
                  <div className="ml-12 sm:ml-16 w-[1.5px] h-4 bg-[var(--border)] skew-x-[-20deg]" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20" />

      {/* HUD Corner Accents */}
      <div
        className="absolute top-1 left-1 w-4 h-4 border-t border-l border-[var(--accent)]/30"
        style={{ borderTopColor: 'var(--accent)', borderLeftColor: 'var(--accent)' }}
      />
      <div
        className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-[var(--accent)]/30"
        style={{ borderBottomColor: 'var(--accent)', borderRightColor: 'var(--accent)' }}
      />
    </div>
  );
}
