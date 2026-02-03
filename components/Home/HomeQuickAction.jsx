"use client";

import Link from "next/link";
import { Globe, Trophy, Gamepad2, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function LeaderboardRegionSection() {
  const actions = [
    {
      title: "Ranking",
      icon: <Trophy className="h-4 w-4" />,
      href: "/leaderboard",
      color: "from-amber-500/10 to-orange-500/10",
      accent: "text-amber-400",
    },
    {
      title: "Games",
      icon: <Gamepad2 className="h-4 w-4" />,
      href: "/games",
      color: "from-blue-500/10 to-indigo-500/10",
      accent: "text-blue-400",
    },
    {
      title: "Services",
      icon: <LayoutGrid className="h-4 w-4" />,
      href: "/services",
      color: "from-purple-500/10 to-fuchsia-500/10",
      accent: "text-purple-400",
    },
    {
      title: "Region",
      icon: <Globe className="h-4 w-4" />,
      href: "/region",
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-400",
    },
  ];

  return (
    <section className="w-full px-4 py-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {actions.map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={action.href}
                className="group relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300"
              >
                {/* Tactical Card Background - NO BORDER */}
                <div className="absolute inset-0 rounded-xl bg-[var(--card)]/40 backdrop-blur-md transition-colors duration-300" />

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Scanline Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl opacity-5 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                </div>

                {/* Icon Container - Smaller - NO BORDER */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`relative h-9 w-9 flex items-center justify-center rounded-lg bg-black/40 shadow-xl ${action.accent} z-10`}
                >
                  {action.icon}

                  {/* Icon Underglow */}
                  <div className={`absolute inset-0 rounded-lg blur-md bg-current opacity-10`} />
                </motion.div>

                {/* Text Content - Tighter */}
                <div className="relative z-10">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold text-[var(--foreground)] opacity-80 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                    {action.title}
                  </span>
                </div>

                {/* Micro Corner Decoration */}
                <div className="absolute top-1.5 right-1.5 w-1 h-1 border-t border-r border-[var(--accent)]/0 group-hover:border-[var(--accent)]/40 transition-colors" />
                <div className="absolute bottom-1.5 left-1.5 w-1 h-1 border-b border-l border-[var(--accent)]/0 group-hover:border-[var(--accent)]/40 transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
