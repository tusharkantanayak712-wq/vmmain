"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaCode, FaPaintBrush, FaTools } from "react-icons/fa";

export default function HomeServices() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 }
  };

  const services = [
    { icon: <FaPaintBrush />, label: "Design" },
    { icon: <FaCode />, label: "Development" },
    { icon: <FaTools />, label: "Maintenance" },
  ];

  return (
    <section className="py-4 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-xl p-5 md:p-6 lg:p-7"
        >
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--accent)]/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            {/* LEFT CONTENT */}
            <div className="flex-1 space-y-2 text-center lg:text-left">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--accent)] text-[9px] font-black uppercase tracking-[0.2em]">Service</span>
              </motion.div>

              <motion.h3
                variants={itemVariants}
                className="text-lg md:text-xl font-black text-[var(--foreground)] leading-tight"
              >
                Premium <span className="text-[var(--accent)]">Web Solutions</span> & Digital Growth
              </motion.h3>

              <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
                {services.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[var(--muted)] text-[10px] font-black uppercase tracking-widest">
                    <span className="text-[var(--accent)] opacity-60 text-xs">{s.icon}</span>
                    <span>{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT ACTION BOX */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-5 lg:gap-8"
            >
              <motion.a
                href="tel:+916372305866"
                className="flex items-center gap-3 group/phone"
                whileHover={{ x: 2 }}
              >
                <div className="w-9 h-9 rounded-full bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20 group-hover/phone:bg-[var(--accent)] group-hover/phone:text-white transition-all duration-300">
                  <FaPhoneAlt size={12} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase opacity-40 tracking-[0.15em]">Support</span>
                  <span className="text-sm font-black text-[var(--foreground)]">+91 63723 05866</span>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 rounded-xl text-white font-black text-xs transition-all duration-300 shadow-md">
                  <FaWhatsapp size={16} />
                  <span className="uppercase tracking-widest text-[11px]">WhatsApp</span>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

