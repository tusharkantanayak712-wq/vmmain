"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa6";

/* ================= CONFIG ================= */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "MewJi";

const BRAND = {
  name: BRAND_NAME,
  description:
    "Instant MLBB diamond top-ups with secure checkout, fair pricing, and real human support.",
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
    <footer className="relative mt-28 text-[var(--muted)] overflow-hidden">

      {/* ===== Ambient glow ===== */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-r from-[var(--accent)]/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />

      {/* ================= TOP BAND ================= */}
      <div className="relative border-t border-[var(--border)] bg-[var(--card)]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ===== Brand ===== */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
              {BRAND.name}
            </h2>

            <p className="text-sm max-w-md leading-relaxed">
              {BRAND.description}
            </p>

            <div className="flex items-center gap-5 text-sm">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--accent)] transition"
              >
                <FaInstagram />
                @{INSTAGRAM_USERNAME}
              </a>

              <a
                href={WHATSAPP_CHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--accent)] transition"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          </div>

          {/* ===== Navigation ===== */}
          <div className="grid grid-cols-2 gap-8 text-sm md:col-span-2">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-[var(--foreground)] opacity-70">
                Navigation
              </p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--accent)] transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wider text-[var(--foreground)] opacity-70">
                Legal
              </p>
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--accent)] transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAND ================= */}
      <div className="border-t border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">

          <p className="opacity-80">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>

          <p className="flex items-center gap-1 opacity-80">
            Built with
            <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5" />
            by
            <a
              href={WHATSAPP_STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              Blue Buff
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
