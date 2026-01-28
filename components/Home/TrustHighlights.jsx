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
    { title: "24/7", subtitle: "Instant Delivery", icon: FaBolt, color: "text-yellow-400" },
    { title: "100%", subtitle: "Safe & Legit", icon: FaShieldAlt, color: "text-green-400" },
    { title: "Easy", subtitle: "Secure Payments", icon: FaCreditCard, color: "text-blue-400" },
    { title: "24/7", subtitle: "Live Support", icon: FaHeadset, color: "text-purple-400" },
    { title: "Trusted", subtitle: "By Thousands", icon: FaUsers, color: "text-amber-400" },
    { title: "Fast", subtitle: "Auto Topups", icon: FaRobot, color: "text-cyan-400" },
  ];

  return (
    <section className="py-2 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold">Why Players Trust Us</h2>
          <p className="text-xs text-[var(--muted)] mt-1">
            Secure • Fast • Verified MLBB Topups
          </p>
        </div>

        {/* Grid: ALWAYS 3 per row */}
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  bg-[var(--card)]
                  border border-[var(--border)]
                  rounded-xl
                  p-3
                  flex flex-col items-center text-center
                "
              >
                {/* Icon */}
                <div
                  className={`
                    w-10 h-10
                    rounded-lg
                    flex items-center justify-center
                    bg-black/40
                    ${item.color}
                  `}
                >
                  <Icon className="text-sm" />
                </div>

                {/* Title */}
                <p className={`mt-2 text-sm font-bold ${item.color}`}>
                  {item.title}
                </p>

                {/* Subtitle */}
                <p className="text-[10px] text-[var(--muted)] leading-tight">
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
