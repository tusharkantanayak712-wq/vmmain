"use client";

import { FiUsers, FiGlobe, FiZap, FiCode } from "react-icons/fi";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "6372305866";
const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

const services = [
  {
    title: "Be a Reseller",
    desc: "Become a reseller and start selling game topups instantly. Access cheapest rates in the market with high profit margins.",
    icon: <FiUsers />,
    badge: "Available • Cheapest",
    active: true,
  },
  {
    title: "Website Whitelabel",
    desc: "Launch your own branded topup website. A complete whitelabel solution with full control, automated delivery, and expert support.",
    icon: <FiGlobe />,
    badge: "Available • Cheapest",
    active: true,
  },
  {
    title: "Custom Topup Website",
    desc: "Get a fully custom-built topup website tailored to your specific business needs and design preferences.",
    icon: <FiZap />,
    badge: "Available",
    active: true,
  },
  {
    title: "API Services",
    desc: "Integrate topup services directly into your existing app or website using our high-speed, secure APIs.",
    icon: <FiCode />,
    badge: "Coming Soon",
    active: false,
  },
];

export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-gray-300">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">Our Services</h1>
        <p className="text-lg text-gray-400 font-medium">Reliable solutions to scale your game top-up business.</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {services.map((service, i) => (
          <div
            key={i}
            onClick={() => service.active && window.open(WHATSAPP_LINK, "_blank")}
            className={`p-8 border rounded-[2rem] bg-gray-900/40 backdrop-blur-sm transition-all text-left
              ${service.active
                ? "cursor-pointer border-gray-800 hover:border-[var(--accent)] hover:bg-gray-900/60"
                : "opacity-40 border-gray-900 cursor-not-allowed"}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-xl">
                {service.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {service.badge}
              </span>
            </div>

            <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{service.title}</h3>
            <p className="text-sm leading-relaxed mb-6 font-medium text-gray-400">
              {service.desc}
            </p>

            {service.active && (
              <div className="inline-flex items-center gap-2 text-[var(--accent)] font-black text-xs uppercase tracking-widest">
                Get Started <span>→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 rounded-[2rem] border border-gray-800 bg-gray-900/50 text-center">
        <h2 className="text-2xl font-black text-white mb-4 uppercase">Want to discuss further?</h2>
        <p className="mb-8 text-gray-400 font-medium">Connect with our business development team on WhatsApp for custom requirements.</p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-opacity"
        >
          Contact Now
        </a>
      </div>
    </main>
  );
}
