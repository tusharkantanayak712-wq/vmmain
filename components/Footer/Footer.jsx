"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaDiscord, FaTelegram, FaHeart } from "react-icons/fa6";
import { FiArrowUpRight, FiMail, FiMapPin, FiMessageSquare, FiShield, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "@/public/logo.png";

/* ================= CONFIG ================= */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

const BRAND = {
  name: BRAND_NAME,
  tagline: "Unleash Your Gaming Potential",
  description:
    "We provide the fastest and most secure game top-up services for gamers worldwide. Experience seamless transactions and 24/7 priority support.",
};

/* ================= ENV ================= */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "6372305866";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const WHATSAPP_CHAT_LINK = `https://wa.me/91${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

const FOOTER_LINKS = {
  company: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Region", href: "/region" },
    { label: "Leaderboard", href: "/leaderboard" },
  ],
  support: [
    { label: "Help Center", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" },
    { label: "Region Check", href: "/region" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

const SOCIAL_LINKS = [
  { icon: <FaInstagram size={20} />, href: INSTAGRAM_URL, color: "hover:text-pink-500", label: "Instagram" },
  { icon: <FaWhatsapp size={20} />, href: WHATSAPP_CHAT_LINK, color: "hover:text-green-500", label: "WhatsApp" },
  { icon: <FaDiscord size={20} />, href: "#", color: "hover:text-indigo-500", label: "Discord" },
  { icon: <FaTelegram size={20} />, href: "#", color: "hover:text-blue-500", label: "Telegram" },
];

/* ================= COMPONENT ================= */

export default function Footer() {
  return (
    <footer className="relative mt-32 bg-[var(--background)] border-t border-[var(--border)] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <Link href="/" className="inline-block group">
                <Image
                  src={logo}
                  alt={BRAND_NAME}
                  width={120}
                  height={40}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <p className="text-[var(--muted)] text-sm leading-relaxed max-w-sm">
                {BRAND.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] transition-all duration-300 ${social.color} hover:border-current hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS COLUMNS */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--foreground)]">Company</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center group">
                      <span className="w-0 group-hover:w-2 h-px bg-[var(--accent)] mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--foreground)]">Support</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors flex items-center group">
                      <span className="w-0 group-hover:w-2 h-px bg-[var(--accent)] mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TRUST BADGES COLUMN */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="flex items-center justify-around md:justify-start md:gap-12 px-4 py-8 bg-gradient-to-br from-[var(--card)] to-transparent rounded-3xl border border-[var(--border)] lg:border-none">
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500/20 transition-colors duration-300">
                  <FiShield size={24} />
                </div>
                <span className="text-[10px] font-black tracking-widest text-[var(--muted)]">SECURE</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                  <FiZap size={24} />
                </div>
                <span className="text-[10px] font-black tracking-widest text-[var(--muted)]">INSTANT</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <FiMail size={24} />
                </div>
                <span className="text-[10px] font-black tracking-widest text-[var(--muted)]">24/7 HELP</span>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent my-10" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs text-[var(--muted)] font-medium">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {FOOTER_LINKS.legal.map((link) => (
                <Link key={link.label} href={link.href} className="text-[10px] uppercase tracking-widest font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-sm">
            <span className="text-[10px] font-bold text-[var(--muted)] tracking-wider">MADE WITH</span>
            <FaHeart className="text-red-500 animate-pulse" size={12} />
            <span className="text-[10px] font-bold text-[var(--muted)] tracking-wider">BY</span>
            <a href="#" className="text-[10px] font-black text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">TK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


