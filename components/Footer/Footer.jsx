"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaHeart } from "react-icons/fa6";
import { FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "@/public/logo.png";

/* ================= CONFIG ================= */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampenttic";

const BRAND = {
  name: BRAND_NAME,
  description:
    "Premium game top-up solutions with instant delivery, secure protocols, and 24/7 expert support. Elevate your gaming experience with Vamp.",
};

/* ================= ENV ================= */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "6372305866";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const INSTAGRAM_USERNAME = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "vampenttic";
const WHATSAPP_STORE_LINK = process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "#";

const WHATSAPP_CHAT_LINK = `https://wa.me/91${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

/* ================= LINKS ================= */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Region", href: "/region" },
  { label: "Services", href: "/services" },
  { label: "Leaderboard", href: "/leaderboard" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

/* ================= COMPONENT ================= */

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border)] bg-[var(--background)] overflow-hidden">
      {/* Subtle Ambient Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* BRAND PORTION */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="Vamp" width={100} height={32} className="opacity-90 hover:opacity-100 transition-opacity" />
            </Link>

            <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed font-medium">
              {BRAND.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ y: -3 }}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] group/link transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/10 transition-transform group-hover/link:scale-110">
                  <FaInstagram size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase opacity-40 tracking-widest leading-none mb-1">Instagram</span>
                  <span className="text-xs font-black text-[var(--foreground)]">@{INSTAGRAM_USERNAME}</span>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href={WHATSAPP_CHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] group/link transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/10 transition-transform group-hover/link:scale-110">
                  <FaWhatsapp size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase opacity-40 tracking-widest leading-none mb-1">Support</span>
                  <span className="text-xs font-black text-[var(--foreground)]">Contact Now</span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                Network
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-all"
                    >
                      {link.label}
                      <FiArrowUpRight className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[var(--accent)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                Compliance
              </p>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 sm:col-span-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                Support
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-[var(--accent)]">
                    <FiMail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase opacity-40 tracking-widest leading-none mb-1">Email</span>
                    <a href="mailto:support@vampenttic.com" className="text-xs font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                      support@vampenttic.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] opacity-60">
              © {new Date().getFullYear()} {BRAND_NAME}. Engineered for Gamers.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/50">
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--muted)]">Made with</span>
            <FaHeart className="text-red-500 animate-pulse text-[10px]" />
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--muted)]">by</span>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              TK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

