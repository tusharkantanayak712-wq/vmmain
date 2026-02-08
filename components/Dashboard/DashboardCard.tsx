import { JSX } from "react";
import {
  FiShoppingBag,
  FiUser,
  FiCreditCard,
  FiHelpCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";

interface DashboardCardProps {
  tab: {
    key: string;
    label: string;
    value: string | number;
  };
  activeTab: string;
  onClick: () => void;
}

/* ================= ICON MAP ================= */
const ICON_MAP: Record<string, JSX.Element> = {
  orders: <FiShoppingBag />,
  account: <FiUser />,
  wallet: <FiCreditCard />,
  query: <FiHelpCircle />,
};

export default function DashboardCard({
  tab,
  activeTab,
  onClick,
}: DashboardCardProps) {
  const isActive = activeTab === tab.key;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className={`relative group p-3 sm:p-3.5 rounded-2xl cursor-pointer border transition-all duration-300 ${isActive
        ? "border-[var(--accent)] bg-[var(--card)] shadow-lg shadow-[var(--accent)]/5"
        : "border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/80 backdrop-blur-sm shadow-sm"
        } flex items-center justify-between overflow-hidden`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all duration-500 ${isActive
            ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20"
            : "bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white"
            }`}
        >
          {ICON_MAP[tab.key] || <FiShoppingBag />}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--muted)] leading-tight">
            Management
          </span>
          <p className={`text-[13px] sm:text-sm font-black tracking-tight leading-tight transition-colors ${isActive ? 'text-[var(--foreground)]' : 'text-[var(--muted)] group-hover:text-[var(--foreground)]'}`}>
            {tab.label}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        {isActive ? (
          <motion.div
            layoutId="indicator"
            className="h-1.5 w-6 sm:w-8 rounded-full bg-[var(--accent)]"
          />
        ) : (
          <span className="text-[9px] sm:text-[10px] font-bold text-[var(--muted)] opacity-50 uppercase tracking-widest px-2 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {tab.value}
          </span>
        )}
      </div>
    </motion.div>
  );
}
