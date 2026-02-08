"use client";

import { useState } from "react";
import { FiHelpCircle, FiX } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpImagePopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Question Mark Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 
                   text-[var(--accent)] flex items-center justify-center
                   shadow-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
        aria-label="Help"
      >
        <FiHelpCircle size={20} />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[var(--background)] border border-[var(--border)] rounded-[2.5rem] max-w-sm w-full p-6 shadow-2xl overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-[50px] pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-1">Visual Guide</span>
                  <h3 className="text-xl font-black tracking-tight">Locate IDs</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)]
                              flex items-center justify-center text-[var(--muted)]
                              hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)]/50">
                <Image
                  src="https://res.cloudinary.com/dk0sslz1q/image/upload/v1765620596/ID_ele414.png"
                  alt="How to find Player ID & Zone ID"
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <p className="mt-6 text-[10px] text-center font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-50">
                Refer to your in-game profile
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
