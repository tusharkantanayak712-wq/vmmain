"use client";

import { useState } from "react";
import {
  FiChevronDown,
  FiCalendar,
  FiUser,
  FiGrid,
  FiCreditCard,
  FiPackage,
  FiHash,
  FiCopy,
  FiCheck,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ================= TYPES ================= */

export type OrderType = {
  orderId: string;
  gameSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  topupStatus?: string;
  createdAt: string;
};

/* ================= GAME NAME ================= */

const getGameName = (slug: string) => {
  const s = slug.toLowerCase();

  const mlbbSlugs = [
    "mobile-legends988",
    "mlbb-smallphp638",
    "mlbb-double332",
    "sgmy-mlbb893",
    "value-pass-ml948",
    "mlbb-russia953",
    "mlbb-indo42",
  ];

  if (mlbbSlugs.some((k) => s.includes(k))) return "Mobile Legends";
  if (s.includes("pubg-mobile138")) return "BGMI";

  return slug;
};

/* ================= MAIN ================= */

export default function OrderItem({ order }: { order: OrderType }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const status = (order.topupStatus || order.status).toLowerCase();

  const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
    success: { color: "#10b981", icon: <FiCheckCircle />, label: "Delivered" },
    failed: { color: "#ef4444", icon: <FiAlertCircle />, label: "Failed" },
    pending: { color: "#f59e0b", icon: <FiClock />, label: "Processing" },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  const handleCopy = () => {
    const receiptText = `
--- Vampettic Order ---
Order: ${getGameName(order.gameSlug)}
ID: ${order.orderId}
Item: ${order.itemName}
Player: ${order.playerId}
Zone: ${order.zoneId || "N/A"}
Amount: ₹${order.price}
Date: ${new Date(order.createdAt).toLocaleString()}
Status: ${currentStatus.label}
--------------------------
`.trim();
    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      className="group rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 hover:bg-[var(--card)]/60 backdrop-blur-sm transition-all duration-300 overflow-hidden"
    >
      {/* MAIN VISIBLE HEADER */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          {/* LEFT: INFO */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: currentStatus.color }}
            >
              <FiPackage size={18} className="sm:size-5" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-60 truncate">
                ID: {order.orderId.slice(-8).toUpperCase()}
              </span>
              <h3 className="text-sm sm:text-[15px] font-black text-[var(--foreground)] tracking-tight truncate">
                {getGameName(order.gameSlug)}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                  style={{ backgroundColor: currentStatus.color }}
                />
                <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: currentStatus.color }}>
                  {currentStatus.label}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: PRICE & ACTIONS */}
          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t sm:border-t-0 border-[var(--border)]/30 pt-3 sm:pt-0">
            <div className="sm:text-right">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-60 block mb-0.5">Amount</span>
              <span className="text-base sm:text-lg font-black text-[var(--foreground)] tracking-tighter">₹{order.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className={`p-2 sm:p-2.5 rounded-xl border border-[var(--border)] transition-all flex items-center gap-2 ${copied ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]/5'}`}
              >
                {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                {copied && <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Copied</span>}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${open ? 'bg-[var(--accent)] text-white' : 'border border-[var(--border)] text-[var(--muted)]'}`}
              >
                <FiChevronDown
                  size={18}
                  className={`transition-transform duration-500 ${open ? "rotate-180" : ""}`}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-6 sm:px-5">
              <div className="pt-4 border-t border-[var(--border)]/50 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-4">
                  <Info label="Service" value={getGameName(order.gameSlug)} icon={<FiUser />} />
                  <Info label="Player ID" value={order.playerId} mono icon={<FiUser />} />
                  <Info label="Zone ID" value={order.zoneId || "N/A"} mono icon={<FiGrid />} />
                </div>

                <div className="space-y-4">
                  <Info label="Item Pack" value={order.itemName} icon={<FiPackage />} />
                  <Info label="Gateway" value={order.paymentMethod.toUpperCase()} icon={<FiCreditCard />} />
                  <Info label="Timestamp" value={new Date(order.createdAt).toLocaleString()} icon={<FiCalendar />} />
                </div>

                {/* BOTTOM DECORATIVE FOOTER IN EXPANDED */}
                <div className="sm:col-span-2 mt-4 px-3 py-2.5 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FiHash className="text-[var(--accent)] flex-shrink-0" />
                    <span className="text-[9px] font-black text-[var(--muted)] tracking-widest truncate">{order.orderId}</span>
                  </div>
                  <span className="text-[8px] font-black uppercase text-[var(--accent)] tracking-[0.25em] flex-shrink-0">Transaction Verified</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================= HELPERS ================= */

function Info({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[var(--muted)]">
        <div className="text-[var(--accent)] opacity-60">
          {icon}
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <span
        className={`${mono ? "font-mono text-xs" : "font-bold text-[13px]"
          } text-[var(--foreground)] truncate`}
      >
        {value}
      </span>
    </div>
  );
}

