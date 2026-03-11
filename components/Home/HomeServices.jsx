"use client";

import { FaWhatsapp } from "react-icons/fa";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "+91 9178521537";
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER.replace(/\D/g, "")}`;

export default function HomeServices() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-[440px] mx-auto">
        <div className="bg-[var(--card)] rounded-[1.5rem] p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--border)]">

          <h3 className="text-xl sm:text-2xl font-[900] text-[#ffa000] italic uppercase mb-1.5 tracking-tight">
            BUILD YOUR WEBSITE
          </h3>

          <p className="text-[14px] sm:text-[16px] text-[var(--muted)] font-semibold mb-8 leading-[1.3] max-w-[260px]">
            We provide all kinds of software development and website services.
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[210px] py-3 bg-[#ffa000] hover:bg-[#ff8f00] text-[#426cff] rounded-[1rem] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-[#ffa000]/10"
          >
            <FaWhatsapp size={20} />
            CONTACT US
          </a>

        </div>
      </div>
    </section>
  );
}



