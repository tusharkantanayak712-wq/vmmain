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
      title: "24/7",
      subtitle: "Instant Delivery",
      icon: FaBolt,
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      title: "100%",
      subtitle: "Safe & Legit",
      icon: FaShieldAlt,
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      title: "Easy",
      subtitle: "Secure Payments",
      icon: FaCreditCard,
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "24/7",
      subtitle: "Live Support",
      icon: FaHeadset,
      gradient: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "Trusted",
      subtitle: "By Thousands",
      icon: FaUsers,
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      title: "Fast",
      subtitle: "Auto Topups",
      icon: FaRobot,
      gradient: "from-cyan-400 to-blue-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-8 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-1 bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
            Why Players Trust Us
          </h2>
          <p className="text-xs text-[var(--muted)]">
            Secure • Fast • Verified Topups
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative"
              >
                <div className={`
                  relative overflow-hidden
                  bg-gradient-to-br ${item.bgGradient}
                  border border-[var(--border)]
                  rounded-xl
                  p-3
                  flex flex-col items-center text-center
                  transition-all duration-300
                  hover:border-transparent
                  hover:shadow-xl
                `}>
                  {/* GRADIENT BORDER ON HOVER */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity
                    bg-gradient-to-br ${item.gradient} p-[2px]
                  `}>
                    <div className="w-full h-full rounded-2xl bg-[var(--card)]" />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10">
                    {/* ICON */}
                    <motion.div
                      className={`
                        w-10 h-10 mx-auto mb-2
                        rounded-lg
                        flex items-center justify-center
                        bg-gradient-to-br ${item.gradient}
                        shadow-lg
                      `}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="text-white text-base" />
                    </motion.div>

                    {/* TITLE */}
                    <p className={`
                      text-sm font-bold mb-0.5
                      bg-gradient-to-br ${item.gradient}
                      bg-clip-text text-transparent
                    `}>
                      {item.title}
                    </p>

                    {/* SUBTITLE */}
                    <p className="text-[10px] text-[var(--muted)] leading-tight">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* SHINE EFFECT */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
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
