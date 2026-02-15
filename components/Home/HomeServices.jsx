"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "+91 6372305866";
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER.replace(/\D/g, "")}`;

export default function HomeServices() {
  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight uppercase">
              Premium Web Solutions
            </h3>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
              Design • Development • Maintenance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-[var(--accent)]">
                <FaPhoneAlt size={14} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest">24/7 Support</p>
                <p className="text-sm font-bold text-white tracking-widest">{PHONE_NUMBER}</p>
              </div>
            </a>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2"
            >
              <FaWhatsapp size={16} />
              WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
