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
    <footer className="mt-24 text-[var(--muted)]">

      {/* ================= TOP BAND ================= */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Brand Story */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">
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
                className="hover:text-[var(--accent)] transition"
              >
                <FaInstagram className="inline mr-1" />
                @{INSTAGRAM_USERNAME}
              </a>

              <a
                href={WHATSAPP_CHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition"
              >
                <FaWhatsapp className="inline mr-1" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex flex-col gap-3">
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
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">

          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>

          <p>
            Built with{" "}
            <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5" />{" "}
            by{" "}
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
