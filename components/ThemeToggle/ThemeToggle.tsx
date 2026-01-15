"use client";

import { useEffect, useState } from "react";

const themes = [
  // 🌍 Core
  { id: "light", icon: "☀️", label: "Light" },
  { id: "dark", icon: "🌙", label: "Dark" },

  // ⚡ Creative / Gaming
  { id: "cyber", icon: "⚡", label: "Cyber Neon" },
  { id: "retro", icon: "👾", label: "Retro Arcade" },
  { id: "matrix", icon: "🧬", label: "Matrix" },
  { id: "neonlime", icon: "🧿", label: "Neon Lime" },

  // 🌸 Soft / Aesthetic
  { id: "sakura", icon: "🌸", label: "Sakura" },
  // { id: "aqua", icon: "🌊", label: "Aqua Wave" },
  { id: "autumn", icon: "🍂", label: "Autumn" },

  // 💖 Girly / Cute
  { id: "rose", icon: "🌹", label: "Rose Blush" },
  { id: "lavender", icon: "💜", label: "Lavender Dream" },
  { id: "peach", icon: "🍑", label: "Peach Glow" },
  // { id: "cotton", icon: "🍬", label: "Cotton Candy" },
  // { id: "bubblegum", icon: "🎀", label: "Bubblegum Pop" },
  // { id: "cherry", icon: "🍒", label: "Cherry Kiss" },
  { id: "vanilla", icon: "🍦", label: "Vanilla Cream" },

  // 🔥 Bold / Aggressive
  { id: "inferno", icon: "🔥", label: "Inferno" },
  { id: "crimson", icon: "🩸", label: "Crimson Noir" },

  // 🧔 Manly / Strong
  { id: "steel", icon: "🔩", label: "Steel Gray" },
  // { id: "gunmetal", icon: "🛠️", label: "Gunmetal" },
  // { id: "midnightblack", icon: "🖤", label: "Midnight Black" },
  // { id: "royalblue", icon: "👑", label: "Royal Blue" },
  { id: "bloodiron", icon: "🩸", label: "Blood Iron" },
  // { id: "warzone", icon: "⚔️", label: "War Zone" },
  { id: "carbon", icon: "🏴", label: "Carbon Fiber" },

  // 🌲 Calm / Natural
  { id: "forest", icon: "🌲", label: "Forest" },
  { id: "emerald", icon: "🪙", label: "Finance Emerald" },

  // 🌌 Dark / Premium
  { id: "void", icon: "🌌", label: "Void Purple" },
  // { id: "obsidian", icon: "🪐", label: "Obsidian" },
  { id: "midnight", icon: "🌙", label: "Midnight Blue" },

  // 🧊 Modern / SaaS
  { id: "glass", icon: "🧊", label: "Glass" },
  { id: "slate", icon: "🧠", label: "Slate Pro" },
  // { id: "frost", icon: "❄️", label: "Frost" },

  // 🎨 Creator / Luxury
  { id: "solar", icon: "🟡", label: "Solar Gold" },
  // { id: "sunset", icon: "🌅", label: "Sunset" },
  { id: "prism", icon: "🌈", label: "Prism" },
];



export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Change theme handler
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theme-toggle-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <div className="relative inline-block text-left theme-toggle-container">
      {/* 🎨 Current Theme Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1 border border-[var(--border)] rounded-full bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white text-xs font-medium transition-all shadow-md hover:shadow-lg"
        aria-label="Select Theme"
      >
        <span className="text-base inline-block animate-sway">
          {currentTheme?.icon || "🎨"}
        </span>
        <span>{currentTheme?.label || "Theme"}</span>
      </button>

      {/* 🪄 Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-md max-h-56 overflow-y-auto">
          <div className="py-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-xs transition-all ${
                  theme === t.id
                    ? "bg-[var(--accent)] text-white font-semibold"
                    : "hover:bg-[var(--accent)] hover:text-white text-[var(--foreground)]"
                }`}
              >
                <span className="text-base emoji-icon">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 💫 Animations */}
      <style jsx>{`
        /* Gentle 45° sway animation */
        @keyframes sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }

        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }

        .emoji-icon {
          transition: transform 0.4s ease;
        }

        .emoji-icon:hover {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
}
