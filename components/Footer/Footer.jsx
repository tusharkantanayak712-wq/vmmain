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
    <footer className="relative mt-20 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-10">

          {/* BRAND AND DESCRIPTION */}
          <div className="max-w-xs space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt={BRAND_NAME}
                width={100}
                height={35}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-[var(--muted)] text-xs leading-relaxed">
              {BRAND.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-[var(--foreground)]/[0.03] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COMBINED LINKS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">Quick Links</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">Support</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden sm:block space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)] opacity-50">Legal</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
            <p className="text-[10px] text-[var(--muted)] font-medium">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link key={link.label} href={link.href} className="text-[9px] uppercase tracking-widest font-bold text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 group cursor-default h-6 px-3 rounded-full bg-[var(--foreground)]/[0.03] border border-[var(--border)] whitespace-nowrap">
            <span className="text-[9px] font-bold text-[var(--muted)]">MADE WITH</span>
            <FaHeart className="text-red-500/80 group-hover:scale-110 transition-transform" size={8} />
            <span className="text-[9px] font-bold text-[var(--muted)]">BY TK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


