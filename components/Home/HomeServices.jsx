"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "+91 9178521537";
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER.replace(/\D/g, "")}`;

export default function HomeServices() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-sm mx-auto">
        <div className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">

          {/* Ambient Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/[0.05] to-transparent pointer-events-none" />

          <h3 className="text-xl font-black text-[var(--foreground)] mb-2 tracking-tight uppercase leading-tight drop-shadow-md relative z-10">
            Premium Web Solutions
          </h3>

          <p className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-[0.15em] mb-8 relative z-10">
            Design • Development • Maintenance
          </p>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-4 mb-8 bg-[var(--background)]/50 p-3 pr-6 rounded-2xl hover:bg-[var(--background)]/80 transition-colors border border-[var(--border)] relative z-10 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-lg group-hover:text-[var(--accent-hover)] transition-colors">
              <FaPhoneAlt size={14} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-[var(--muted)] tracking-widest mb-0.5">24/7 Support</p>
              <p className="text-sm font-bold text-[var(--foreground)] tracking-widest">{PHONE_NUMBER}</p>
            </div>
          </a>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 relative z-10"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </a>

        </div>
      </div>
    </section>
  );
}
