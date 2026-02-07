"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaCode, FaPaintBrush, FaTools } from "react-icons/fa";

export default function HomeServices() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const services = [
    { icon: <FaPaintBrush />, label: "Design" },
    { icon: <FaCode />, label: "Development" },
    { icon: <FaTools />, label: "Maintenance" },
  ];

  return (
    <section className="py-6 px-4 bg-[var(--background)] relative overflow-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-gradient-to-br from-[var(--card)]/40 to-[var(--background)]/60 backdrop-blur-xl shadow-xl p-6 md:p-8"
        >
          {/* TACTICAL CORNER ACCENTS */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent)]/30 rounded-tl-[1.5rem]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-[1.5rem]" />

          {/* ANIMATED ACCENT LINE */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--accent)] via-purple-500 to-[var(--accent)]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

            {/* LEFT CONTENT */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--accent)] text-[10px] font-bold uppercase tracking-widest">Premium</span>
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="text-xl md:text-2xl font-black text-[var(--foreground)] leading-tight"
              >
                Website Design, <span className="bg-gradient-to-r from-[var(--accent)] to-purple-400 bg-clip-text text-transparent">Development & Maintenance</span>
              </motion.h3>

              {/* COMPACT SERVICE ICONS */}
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4">
                {services.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-[var(--muted)] text-xs font-medium">
                    <span className="text-[var(--accent)]">{s.icon}</span>
                    <span>{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT CTA BOX */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <motion.a
                href="tel:+919178521537"
                className="flex items-center gap-3 text-lg font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                  <FaPhoneAlt size={12} className="text-[var(--accent)]" />
                </div>
                <span>+91 63723 05866</span>
              </motion.a>

              <motion.a
                href="https://wa.me/919178521537"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur opacity-20 group-hover/btn:opacity-40 transition duration-300" />
                <div className="relative flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-bold text-sm shadow-lg">
                  <FaWhatsapp size={18} />
                  <span>Get Service</span>
                </div>
              </motion.a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
