"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiX, FiArrowRight } from "react-icons/fi";

const STORAGE_KEY = "hide_whatsapp_banner";

const WHATSAPP_CHANNEL_URL = process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "";

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
          className="w-full border-b border-[var(--border)] bg-gradient-to-r from-green-600/10 via-[var(--card)] to-green-600/10 relative z-10 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 relative z-10">
            <div className="flex items-center justify-between gap-4">
              {/* CONTENT AREA */}
              <motion.div
                onClick={handleClick}
                className="flex flex-1 items-center gap-3 cursor-pointer group min-w-0"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                {/* ICON */}
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <FaWhatsapp size={18} />
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--foreground)]">
                      WhatsApp Exclusive
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-green-500/10 text-green-600 text-[9px] font-black uppercase tracking-tighter">
                      News
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[var(--muted)] truncate font-medium max-w-md">
                    Stay updated with instant offers, rewards & special announcements.
                  </p>
                </div>
              </motion.div>

              {/* ACTION AREA */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleClick}
                  className="hidden sm:flex items-center gap-2 text-[var(--accent)] font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all group/btn"
                >
                  Join Channel
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />

                <motion.button
                  onClick={handleClose}
                  className="p-1.5 text-[var(--muted)] hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX size={16} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* TOP SLIM LINE */}
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

