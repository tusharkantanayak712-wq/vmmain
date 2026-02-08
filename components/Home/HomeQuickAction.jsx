"use client";

import Link from "next/link";
import { Globe, Trophy, Gamepad2, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeQuickAction() {
  const actions = [
    {
      title: "Ranking",
      icon: <Trophy className="h-5 w-5" />,
      href: "/leaderboard",
      accent: "#f59e0b", // Amber
    },
    {
      title: "Games",
      icon: <Gamepad2 className="h-5 w-5" />,
      href: "/games",
      accent: "#3b82f6", // Blue
    },
    {
      title: "Services",
      icon: <LayoutGrid className="h-5 w-5" />,
      href: "/services",
      accent: "#8b5cf6", // Purple
    },
    {
      title: "Region",
      icon: <Globe className="h-5 w-5" />,
      href: "/region",
      accent: "#10b981", // Emerald
    },
  ];

  return (
    <section className="w-full px-4 py-2 relative">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {actions.map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <Link
                href={action.href}
                className="group flex flex-col items-center gap-2 relative p-1.5"
              >
                {/* ICON CONTAINER - VIBRANT & TIGHT */}
                <div className="relative">
                  {/* Subtle Constant Glow */}
                  <div
                    className="absolute inset-0 blur-lg opacity-10 rounded-full"
                    style={{ backgroundColor: action.accent }}
                  />

                  <div
                    className="relative flex items-center justify-center p-2.5 rounded-xl bg-[var(--card)]/30 backdrop-blur-sm border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--card)]/50"
                    style={{ color: action.accent }}
                  >
                    {action.icon}

                    {/* Hover Bloom */}
                    <div
                      className="absolute inset-0 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"
                      style={{ backgroundColor: action.accent }}
                    />
                  </div>
                </div>

                {/* TEXT CONTENT - COMPACT */}
                <div className="flex flex-col items-center">
                  <span
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 group-hover:brightness-125"
                    style={{ color: `${action.accent}cc` }} // Slightly transparent text
                  >
                    {action.title}
                  </span>

                  {/* Slim Underline */}
                  <motion.div
                    className="h-[1.5px] w-0 mt-1 rounded-full group-hover:w-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: action.accent }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
