"use client";

import { motion } from "framer-motion";
import {
  FaBolt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

export default function TrustHighlights() {
  const items = [
    {
      title: "Instant",
      subtitle: "Fast Delivery",
      icon: FaBolt,
      accent: "#f59e0b", // Amber
    },
    {
      title: "Legit",
      subtitle: "100% Secure",
      icon: FaShieldAlt,
      accent: "#10b981", // Emerald
    },
    {
      title: "Easy",
      subtitle: "Secure Pay",
      icon: FaCreditCard,
      accent: "#3b82f6", // Blue
    },
    {
      title: "24/7",
      subtitle: "Live Support",
      icon: FaHeadset,
      accent: "#8b5cf6", // Purple
    },
    {
      title: "Trusted",
      subtitle: "Top Rating",
      icon: FaUsers,
      accent: "#ec4899", // Pink
    },
    {
      title: "Auto",
      subtitle: "Smart System",
      icon: FaRobot,
      accent: "#06b6d4", // Cyan
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-6 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* HEADING - MINIMALIST */}
        <motion.div
          className="text-center mb-6 space-y-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] opacity-80">
            Reliability
          </span>
          <h2 className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tight">
            Why Trusted by Players
          </h2>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-[var(--card)]/20 backdrop-blur-sm border border-[var(--border)]/50 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 group-hover:bg-[var(--card)]/40 group-hover:border-[var(--border)]">
                  {/* ICON - SOFT TINTED */}
                  <div className="relative mb-3.5">
                    <div
                      className="absolute inset-0 blur-lg opacity-10 group-hover:opacity-30 transition-opacity rounded-full scale-150"
                      style={{ backgroundColor: item.accent }}
                    />
                    <div
                      className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${item.accent}15`,
                        color: item.accent,
                        border: `1px solid ${item.accent}30`
                      }}
                    >
                      <Icon className="text-lg" />
                    </div>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="space-y-0.5">
                    <p
                      className="text-xs font-black uppercase tracking-wider"
                      style={{ color: item.accent }}
                    >
                      {item.title}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-[var(--muted)] uppercase tracking-tight opacity-60">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* BOTTOM HOVER LINE */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
