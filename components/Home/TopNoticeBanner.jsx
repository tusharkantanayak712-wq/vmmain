"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiChevronRight } from "react-icons/fi";

const STORAGE_KEY = "hide_whatsapp_banner";

const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "";

export default function TopNoticeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = sessionStorage.getItem(STORAGE_KEY);
    if (!hidden && WHATSAPP_CHANNEL_URL) setVisible(true);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  const handleClick = () => {
    window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer");
  };

  if (!WHATSAPP_CHANNEL_URL) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="w-full border-b border-[var(--border)] bg-gradient-to-r from-[var(--background)] via-[var(--card)] to-[var(--background)] relative overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--accent) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '24px 24px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.div
            onClick={handleClick}
            className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 cursor-pointer relative z-10"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2.5 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg relative"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                    "0 0 0 8px rgba(34, 197, 94, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaWhatsapp size={20} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--background)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              <div className="leading-tight">
                <p className="font-bold text-sm md:text-base text-[var(--foreground)] flex items-center gap-2">
                  Join our WhatsApp Channel
                  <motion.span
                    className="inline-block px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    NEW
                  </motion.span>
                </p>
                <p className="text-xs md:text-sm text-[var(--muted)]">
                  Instant offers, updates & exclusive announcements
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <motion.span
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiChevronRight size={16} />
                </motion.div>
              </motion.span>

              <motion.button
                onClick={handleClose}
                className="rounded-full p-2 text-[var(--muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close"
              >
                <FiX size={18} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
