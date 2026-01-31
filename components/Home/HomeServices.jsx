"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function HomeServices() {
  return (
    <section className="py-8 px-4 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* GRADIENT ACCENT */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] to-purple-500" />

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent)]/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-6">

            {/* LEFT CONTENT */}
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-r from-[var(--foreground)] to-[var(--accent)] bg-clip-text text-transparent">
                Website Design, Development & Maintenance
              </h3>
              <p className="text-sm text-[var(--muted)]">
                Professional end-to-end solutions for your business
              </p>
            </div>

            {/* RIGHT CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* PHONE */}
              <motion.a
                href="tel:+916372305866"
                className="text-lg font-bold bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                +91 63723 05866
              </motion.a>

              {/* BUTTON */}
              <motion.a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-sm shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px rgba(34, 197, 94, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaWhatsapp className="text-lg" />
                </motion.div>
                <span>Get Service</span>
              </motion.a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
