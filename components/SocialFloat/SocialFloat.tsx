"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaHeart,
  FaShareNodes,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "VAMPETTIC";

const WHATSAPP_CHAT_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
  : "#";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    url: WHATSAPP_CHAT_LINK,
    gradient: "from-green-400 to-green-600",
    hoverColor: "hover:shadow-green-500/50",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: INSTAGRAM_URL,
    gradient: "from-purple-500 via-pink-500 to-orange-500",
    hoverColor: "hover:shadow-pink-500/50",
  },
];

export default function SocialFloat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ================= SCROLL VISIBILITY ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling Down
        setIsVisible(false);
        setIsOpen(false);
      } else {
        // Scrolling Up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Only show on / or /home
  const isHome = pathname === "/" || pathname === "/home";
  if (!isHome) return null;

  /* ================= CLOSE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  /* ================= SHARE ================= */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: BRAND_NAME,
          text: "Check out this awesome site!",
          url: window.location.href,
        });
      } catch { }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50"
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 flex flex-col items-end gap-3"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.div key={social.name} variants={itemVariants}>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${social.gradient} flex items-center justify-center text-white text-lg shadow-lg ${social.hoverColor} group overflow-hidden`}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon />
                      </motion.div>
                      <motion.span
                        className="absolute right-16 bg-[var(--card)] border border-[var(--border)] px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--foreground)] whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100"
                        initial={{ x: 10 }}
                        whileHover={{ x: 0 }}
                      >
                        {social.name}
                      </motion.span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent w-12 my-1"
              variants={itemVariants}
            />

            <motion.div variants={itemVariants}>
              <motion.button
                onClick={handleShare}
                className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg shadow-lg hover:shadow-blue-500/50 group overflow-hidden"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share"
              >
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.div
                  whileHover={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaShareNodes />
                </motion.div>
                <motion.span
                  className="absolute right-16 bg-[var(--card)] border border-[var(--border)] px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--foreground)] whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  Share
                </motion.span>
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="https://ko-fi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="relative w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-white text-lg shadow-lg hover:shadow-pink-500/50 group overflow-hidden"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Support"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/50"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaHeart />
                  </motion.div>
                  <motion.span
                    className="absolute right-16 bg-[var(--card)] border border-[var(--border)] px-3 py-1.5 rounded-lg text-sm font-semibold text-[var(--foreground)] whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100"
                    initial={{ x: 10 }}
                    whileHover={{ x: 0 }}
                  >
                    Support Us
                  </motion.span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Toggle social menu"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white/30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <svg
          className="w-6 h-6 relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}
