"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";

/* ================= CONFIG ================= */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "MewJi";

const BRAND = {
  name: BRAND_NAME,
  description:
    "Instant game top-ups with secure checkout, fair pricing, and real human support.",
};

/* ================= ENV ================= */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const INSTAGRAM_USERNAME =
  process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "instagram";
const WHATSAPP_STORE_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "#";

const WHATSAPP_CHAT_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
  : "#";

/* ================= LINKS ================= */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Region", href: "/region" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

/* ================= COMPONENT ================= */

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)] overflow-hidden">
      {/* ===== Subtle Ambient glow ===== */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--primary)]/5 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* ===== Brand Section ===== */}
          <div className="md:col-span-5 space-y-5">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-black text-[var(--foreground)] tracking-tight inline-flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white text-sm">
                {BRAND.name.charAt(0)}
              </span>
              {BRAND.name}
            </motion.h2>

            <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
              {BRAND.description}
            </p>

            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all shadow-sm flex items-center gap-2 text-xs font-semibold"
              >
                <FaInstagram className="text-lg" />
                <span>@{INSTAGRAM_USERNAME}</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                href={WHATSAPP_CHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-green-500 hover:border-green-500/30 transition-all shadow-sm flex items-center gap-2 text-xs font-semibold"
              >
                <FaWhatsapp className="text-lg" />
                <span>WhatsApp Support</span>
              </motion.a>
            </div>
          </div>

          {/* ===== Compact Links ===== */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--primary)] opacity-80">
                Menu
              </p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--primary)] opacity-80">
                Legal
              </p>
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] font-medium text-[var(--muted)]">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-[10px] font-medium text-[var(--muted)] flex items-center gap-1.5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              Built with
              <FaHeart className="w-2.5 h-2.5 text-red-500 fill-red-500" />
              by
              <a
                href={WHATSAPP_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
              >
                Blue Buff
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
