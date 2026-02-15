"use client";

import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "6372305866";
const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>

      <div className="space-y-10">
        <section>
          <p className="text-lg leading-relaxed mb-6">
            Have a question about your order or need assistance with a top-up? Our support team is here to help you 24/7. Reach out via any of the channels below.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Support */}
          <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50">
            <div className="flex items-center gap-3 text-white mb-3">
              <FaEnvelope className="text-[var(--accent)] text-xl" />
              <h2 className="text-xl font-semibold">Email Support</h2>
            </div>
            <p className="text-sm mb-4">Best for detailed inquiries or order issues.</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[var(--accent)] font-bold hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </div>

          {/* WhatsApp Support */}
          <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50">
            <div className="flex items-center gap-3 text-white mb-3">
              <FaWhatsapp className="text-green-500 text-xl" />
              <h2 className="text-xl font-semibold">WhatsApp</h2>
            </div>
            <p className="text-sm mb-4">Instant support for quick questions.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-green-500 font-bold hover:underline">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
          <p className="mb-6">Stay updated with the latest game launches and exclusive offers.</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold hover:opacity-90 transition-opacity"
          >
            <FaInstagram /> Instagram
          </a>
        </section>

        <section className="pt-8 border-t border-gray-800">
          <p className="text-sm opacity-60">
            We usually respond to all inquiries within 24 hours. For urgent order issues, please quote your Order ID.
          </p>
        </section>
      </div>
    </main>
  );
}
