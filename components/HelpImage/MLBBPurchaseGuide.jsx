"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import {
  FaShoppingCart,
  FaIdCard,
  FaWallet,
  FaMoneyBillWave,
  FaGem,
} from "react-icons/fa";

const steps = [
  {
    title: "Select diamond package",
    icon: FaShoppingCart,
    content: "Choose the diamond pack you want to purchase.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Enter Player ID & Zone",
    icon: FaIdCard,
    content: "Provide your MLBB Player ID, Zone ID, and in-game name accurately.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Choose payment method",
    icon: FaWallet,
    content: "Select UPI or wallet as your preferred payment option.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Complete payment",
    icon: FaMoneyBillWave,
    content: "Finish the payment securely.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Diamonds delivered",
    icon: FaGem,
    content: "Diamonds are credited instantly to your account.",
    gradient: "from-yellow-500 to-amber-500",
  },
];

export default function MLBBPurchaseGuide() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            className="w-1 h-6 bg-gradient-to-b from-[var(--accent)] to-purple-500 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h3 className="text-lg font-bold bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
            How it works
          </h3>
        </div>
        <p className="text-xs text-[var(--muted)] pl-3">
          Complete your MLBB diamond purchase in a few simple steps
        </p>
      </div>

      {/* STEPS */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ borderColor: "var(--accent)" }}
            >
              <motion.button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-4 text-left p-4"
                whileTap={{ scale: 0.98 }}
              >
                {/* NUMBER */}
                <motion.div
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)]/10 to-purple-500/10 flex items-center justify-center text-xs font-bold text-[var(--accent)]"
                  animate={isOpen ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.div>

                {/* ICON */}
                <motion.div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} text-white shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={18} />
                </motion.div>

                {/* TITLE */}
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${isOpen ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                    {step.title}
                  </p>
                </div>

                {/* CHEVRON */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-lg text-[var(--muted)]" />
                </motion.div>
              </motion.button>

              {/* CONTENT */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pl-20">
                      <motion.div
                        className="p-3 rounded-lg bg-[var(--card)] border border-[var(--border)]"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-xs leading-relaxed text-[var(--muted)]">
                          {step.content}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER NOTE */}
      <motion.div
        className="mt-6 p-3 rounded-lg bg-gradient-to-r from-[var(--accent)]/5 to-purple-500/5 border border-[var(--accent)]/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xs text-[var(--muted)] text-center">
          💎 <span className="font-semibold text-[var(--accent)]">Instant delivery</span> • Safe & secure • 24/7 support
        </p>
      </motion.div>
    </motion.div>
  );
}
