import {
  FaBolt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

export default function TrustHighlights() {
  const items = [
    { title: "24/7", subtitle: "Instant Delivery", icon: FaBolt, color: "yellow" },
    { title: "100%", subtitle: "Safe & Legit", icon: FaShieldAlt, color: "green" },
    { title: "Easy", subtitle: "Secure Payments", icon: FaCreditCard, color: "blue" },
    { title: "24/7", subtitle: "Live Support", icon: FaHeadset, color: "purple" },
    { title: "Trusted", subtitle: "By Thousands", icon: FaUsers, color: "amber" },
    { title: "Fast", subtitle: "Auto Topups", icon: FaRobot, color: "cyan" },
  ];

  return (
    <section className="py-12 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADING ================= */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Why Players Trust Us
          </h2>
          <p className="text-sm text-[var(--muted)] mt-2">
            Secure • Fast • Verified MLBB Topups
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  relative
                  bg-[var(--card)]
                  border border-[var(--border)]
                  rounded-2xl
                  p-5 md:p-6
                  flex flex-col items-center text-center
                  transition-all duration-300
                  active:scale-[0.97]
                  md:hover:-translate-y-1 md:hover:shadow-xl
                "
              >
                {/* Soft gradient glow (always visible, subtle) */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl opacity-60
                    bg-gradient-to-br
                    from-${item.color}-400/5
                    to-transparent
                    pointer-events-none
                  `}
                />

                {/* Icon container */}
                <div
                  className={`
                    relative z-10
                    w-14 h-14 md:w-16 md:h-16
                    rounded-xl
                    flex items-center justify-center
                    bg-black/40
                    ring-1 ring-white/10
                    text-${item.color}-400
                    shadow-md
                    transition-transform duration-300
                    md:group-hover:scale-110
                  `}
                >
                  <Icon className="text-lg md:text-xl" />
                </div>

                {/* Title */}
                <p
                  className={`
                    mt-4
                    text-lg md:text-xl
                    font-bold
                    tracking-tight
                    text-${item.color}-400
                  `}
                >
                  {item.title}
                </p>

                {/* Subtitle */}
                <p className="text-xs md:text-sm text-[var(--muted)] mt-1 leading-snug">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
