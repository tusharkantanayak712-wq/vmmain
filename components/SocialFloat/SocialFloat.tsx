"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaHeart,
  FaShareNodes,
} from "react-icons/fa6";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "YUJI MLBB";

const WHATSAPP_CHAT_LINK = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`
  : "#";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    url: WHATSAPP_CHAT_LINK,
    color: "hover:bg-green-500 hover:text-white",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: INSTAGRAM_URL,
    color:
      "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white",
  },
];

export default function SocialFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ================= CLOSE ON OUTSIDE CLICK ================= */
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  /* ================= SHARE ================= */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: BRAND_NAME,
          text: "Check out this awesome site!",
          url: window.location.href,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      {/* ================= FLOATING MENU (ONLY WHEN OPEN) ================= */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  w-12 h-12
                  rounded-full
                  bg-[var(--card)]
                  border border-[var(--border)]
                  flex items-center justify-center
                  text-lg
                  shadow-lg
                  transition-all
                  hover:scale-110 hover:shadow-xl
                  animate-[fadeUp_0.3s_ease-out]
                  ${social.color}
                `}
                style={{ animationDelay: `${index * 60}ms` }}
                aria-label={social.name}
              >
                <Icon />
              </Link>
            );
          })}

          <div className="h-px bg-[var(--border)] w-8 my-1" />

          <button
            onClick={handleShare}
            className="
              w-12 h-12
              rounded-full
              bg-[var(--card)]
              border border-[var(--border)]
              flex items-center justify-center
              text-lg
              shadow-lg
              transition-all
              hover:scale-110 hover:shadow-xl
              hover:bg-blue-600 hover:text-white
              animate-[fadeUp_0.3s_ease-out]
            "
            style={{ animationDelay: `${socialLinks.length * 60}ms` }}
            aria-label="Share"
          >
            <FaShareNodes />
          </button>

          <Link
            href="https://ko-fi.com/zynxv1"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-12 h-12
              rounded-full
              bg-[var(--card)]
              border border-[var(--border)]
              flex items-center justify-center
              text-lg
              shadow-lg
              transition-all
              hover:scale-110 hover:shadow-xl
              hover:bg-pink-600 hover:text-white
              animate-[fadeUp_0.3s_ease-out]
            "
            style={{ animationDelay: `${(socialLinks.length + 1) * 60}ms` }}
            aria-label="Support"
          >
            <FaHeart />
          </Link>
        </div>
      )}

      {/* ================= TOGGLE BUTTON ================= */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`
          w-14 h-14
          rounded-full
          bg-gradient-to-br from-[var(--accent)] to-purple-600
          text-white
          flex items-center justify-center
          shadow-lg hover:shadow-xl
          transition-all
          hover:scale-110
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
        aria-label="Toggle social menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
