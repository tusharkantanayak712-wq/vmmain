"use client";

/* ================= NOTICE CONFIG (EDIT HERE) ================= */
const NOTICE_CONFIG = {
  brandFallback: "Meowji",
  items: [
    {
      type: "brand",
      prefix: "Welcome to",
      suffix: "Store",
    },
    {
      type: "text",
      highlight: "Instant",
      text: "Instant & Safe Top-Ups",
    },
    {
      type: "text",
      highlight: "24×7",
      text: "24×7 Automated Delivery",
    },
  ],
  animationDuration: "23s",
};
/* ============================================================= */

export default function ScrollingNoticeBand() {
  const BRAND_NAME =
    process.env.NEXT_PUBLIC_BRAND_NAME || NOTICE_CONFIG.brandFallback;

  return (
    <div className="w-full overflow-hidden bg-[var(--card)] border-b border-[var(--border)] mt-2">
      <div
        className="scroll-track py-2 text-sm font-medium whitespace-nowrap text-[var(--foreground)]"
        style={{ animationDuration: NOTICE_CONFIG.animationDuration }}
      >
        {/* Render twice for seamless scrolling */}
        {[...NOTICE_CONFIG.items, ...NOTICE_CONFIG.items].map(
          (item, index) => {
            if (item.type === "brand") {
              return (
                <span key={index} className="mx-8">
                  {item.prefix}{" "}
                  <b className="text-[var(--accent)]">
                    {BRAND_NAME} {item.suffix}
                  </b>
                </span>
              );
            }

            if (item.type === "text") {
              return (
                <span key={index} className="mx-8">
                  <b className="text-[var(--accent)]">
                    {item.highlight}
                  </b>{" "}
                  {item.text.replace(item.highlight, "")}
                </span>
              );
            }

            return null;
          }
        )}
      </div>

      <style jsx>{`
        .scroll-track {
          display: inline-block;
          animation: scroll-left linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
