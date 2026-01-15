"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const STORAGE_KEY = "hide_whatsapp_banner";

const WHATSAPP_CHANNEL_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_STORE_LINK || "";

export default function TopNoticeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = sessionStorage.getItem(STORAGE_KEY);
    if (!hidden && WHATSAPP_CHANNEL_URL) setVisible(true);
  }, []);

  if (!visible || !WHATSAPP_CHANNEL_URL) return null;

  return (
    <div className="w-full border-b border-[var(--border)] bg-[var(--background)]">
      <div
        onClick={() =>
          window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer")
        }
        className="
          max-w-7xl mx-auto px-4 py-3
          flex items-center justify-between gap-4
          cursor-pointer
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            className="
              p-2 rounded-full
              bg-[var(--accent)]/15
              text-[var(--accent)]
            "
          >
            <FaWhatsapp size={18} />
          </div>

          <div className="leading-tight">
            <p className="font-semibold text-sm md:text-base text-[var(--foreground)]">
              Join our WhatsApp Channel
            </p>
            <p className="text-xs md:text-sm text-[var(--muted)]">
              Instant offers, updates & announcements
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <span
            className="
              hidden sm:inline-flex items-center
              px-4 py-1.5 rounded-full
              text-sm font-semibold
              text-[var(--accent)]
              bg-[var(--accent)]/10
              border border-[var(--accent)]/30
            "
          >
            Join Channel
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sessionStorage.setItem(STORAGE_KEY, "true");
              setVisible(false);
            }}
            className="
              rounded-full p-1.5
              text-[var(--muted)]
              hover:text-[var(--foreground)]
              hover:bg-[var(--card)]
              transition
            "
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
