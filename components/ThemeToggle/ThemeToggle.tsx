"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { LuPalette } from "react-icons/lu";

const THEME_GROUPS = [
  {
    name: "Core",
    items: [
      { id: "light", icon: "☀️", label: "Light" },
      { id: "dark", icon: "🌙", label: "Dark" },
    ]
  },
  {
    name: "Gaming",
    items: [
      { id: "cyber", icon: "⚡", label: "Cyber Neon" },
      { id: "retro", icon: "👾", label: "Retro Arcade" },
      { id: "matrix", icon: "🧬", label: "Matrix" },
    ]
  },
  {
    name: "Premium",
    items: [
      { id: "glass", icon: "🧊", label: "Glass" },
      { id: "slate", icon: "🧠", label: "Slate Pro" },
      { id: "void", icon: "🌌", label: "Void Luxe" },
    ]
  },
  {
    name: "Soft",
    items: [
      { id: "sakura", icon: "🌸", label: "Sakura" },
      { id: "lavender", icon: "💜", label: "Lavender" },
      { id: "peach", icon: "🍑", label: "Peach" },
    ]
  },
  {
    name: "Strong",
    items: [
      { id: "crimson", icon: "🩸", label: "Crimson" },
      { id: "carbon", icon: "🏴", label: "Carbon" },
      { id: "bloodiron", icon: "⛓️", label: "Blood Iron" },
    ]
  }
];

const ALL_THEMES = THEME_GROUPS.flatMap(g => g.items);

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theme-toggle-container")) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const currentTheme = ALL_THEMES.find((t) => t.id === theme);

  return (
    <div className="relative inline-block theme-toggle-container">
      {/* TRIGGER BUTTON - CIRCULAR */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full bg-[var(--card)]/50 backdrop-blur-md border border-[var(--border)] hover:border-[var(--accent)]/50 flex items-center justify-center transition-all shadow-sm group relative overflow-hidden"
      >
        <div className="relative w-5 h-5 flex items-center justify-center text-sm z-10">
          <LuPalette className={`transition-transform duration-500 ${open ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
          <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${open ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
            {currentTheme?.icon || "✨"}
          </span>
        </div>

        {/* Subtle background glow on active */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/0 to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-56 bg-[var(--card)]/90 backdrop-blur-2xl border border-[var(--border)] rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--border)]/50 bg-[var(--accent)]/5">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                Appearance Settings
              </p>
            </div>

            <div className="max-h-[350px] overflow-y-auto px-2 py-2 theme-scroll">
              {THEME_GROUPS.map((group, gIdx) => (
                <div key={group.name} className={gIdx !== 0 ? "mt-4" : ""}>
                  <p className="px-3 mb-1.5 text-[8px] font-black uppercase tracking-[0.4em] text-[var(--muted)] opacity-50">
                    {group.name}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => changeTheme(t.id)}
                        className={`w-full group/item flex items-center justify-between px-3 py-2 rounded-full transition-all ${theme === t.id
                          ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20"
                          : "hover:bg-[var(--accent)]/10 text-[var(--foreground)]"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm transition-transform group-hover/item:scale-125 duration-300">{t.icon}</span>
                          <span className={`text-[11px] font-bold ${theme === t.id ? 'opacity-100' : 'opacity-70 group-hover/item:opacity-100'}`}>
                            {t.label}
                          </span>
                        </div>
                        {theme === t.id && (
                          <motion.div layoutId="active-check">
                            <FiCheck className="w-3.5 h-3.5" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .theme-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .theme-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .theme-scroll::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

