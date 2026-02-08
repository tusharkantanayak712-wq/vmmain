"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiUser, FiShoppingBag, FiCreditCard, FiTrendingUp, FiBarChart2, FiClock, FiHeart } from "react-icons/fi";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("weekly"); // weekly | monthly

  const limit = 10;

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    setLoading(true);

    fetch(`/api/leaderboard?limit=${limit}&range=${range}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.success ? res.data : []);
      })
      .finally(() => setLoading(false));
  }, [range]);

  const getRankStyle = () => {
    return {
      card: "border-[var(--border)] bg-[var(--card)]/40",
      badge: "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30",
      icon: "text-[var(--muted)]",
      glow: "shadow-transparent"
    };
  };

  return (
    <AuthGuard>
      <section className="min-h-screen pt-24 pb-12 px-4 bg-[var(--background)] relative overflow-hidden">

        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">

          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent)] w-fit mx-auto mb-4">
              <FiAward size={10} />
              Elite Rankings
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Hall of Fame</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted)] opacity-60">
              Honoring Our Top Tier Contributors
            </p>
          </motion.div>

          {/* ================= RANGE SELECTOR ================= */}
          <div className="flex justify-center mb-10">
            <div className="flex p-1.5 bg-[var(--card)]/40 backdrop-blur-xl border border-[var(--border)] rounded-[1.25rem] relative shadow-2xl overflow-hidden group/selector">
              {/* Background HUD decorative lines */}
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-50" />

              <AnimatePresence mode="wait">
                {["weekly", "monthly"].map((r) => {
                  const isSelected = range === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl transition-all duration-500 overflow-hidden ${isSelected ? "text-white" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }`}
                    >
                      {/* Shared Background Slider */}
                      {isSelected && (
                        <motion.div
                          layoutId="active-range-bg"
                          className="absolute inset-0 bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/80 rounded-xl -z-10 shadow-[0_0_20px_var(--accent)]/20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      {/* Icon */}
                      <span className={`transition-transform duration-500 ${isSelected ? "scale-110" : "scale-100 opacity-60 group-hover/selector:opacity-100"}`}>
                        {r === "weekly" ? <FiClock size={13} /> : <FiBarChart2 size={13} />}
                      </span>

                      {/* Label */}
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                        {r === "weekly" ? "Weekly" : "Monthly"}
                      </span>

                      {/* Active Indicator Dot */}
                      {isSelected && (
                        <motion.div
                          layoutId="active-dot"
                          className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]"
                        />
                      )}
                    </button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-2 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Syncing Data...</span>
              </div>
            ) : data.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 px-6 rounded-[2.5rem] border border-dashed border-[var(--border)] bg-[var(--card)]/20"
              >
                <div className="w-16 h-16 bg-[var(--card)] border border-[var(--border)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--muted)]">
                  <FiTrendingUp size={32} />
                </div>
                <h3 className="text-xl font-black mb-2">The Spot is Open</h3>
                <p className="text-sm text-[var(--muted)] max-w-xs mx-auto mb-6">
                  No rankings captured for this period. Be the first to claim the #1 position.
                </p>
                <button className="px-8 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all">
                  Begin Your Journey
                </button>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {data.map((item, index) => {
                    const rank = index + 1;
                    const style = getRankStyle();

                    return (
                      <motion.div
                        key={item.user?._id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative group flex items-center justify-between p-4 sm:p-5 rounded-[1.75rem] border backdrop-blur-md transition-all duration-500 ${style.card} hover:scale-[1.01] hover:border-[var(--accent)]/50 ${style.glow} shadow-xl`}
                      >
                        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                          {/* Rank Badge */}
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-black text-sm sm:text-base border border-white/10 ${style.badge}`}>
                            #{rank}
                          </div>

                          <div className="min-w-0">

                            <h3 className="font-black text-sm sm:text-base truncate tracking-tight flex items-center gap-2">
                              {item.user?.name || "Anonymous User"}
                              {item.user?.email === "admin@gmail.com" && (
                                <FiHeart className="text-red-500 fill-red-500 animate-pulse" size={14} />
                              )}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 sm:gap-12 flex-shrink-0 text-right">
                          <div className="hidden sm:flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)] opacity-60">Orders</span>
                            <div className="flex items-center gap-1.5 justify-end">
                              <FiShoppingBag size={12} className="text-[var(--accent)]" />
                              <span className="font-black text-sm">{item.totalOrders}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)] opacity-60">Contribution</span>
                            <div className="flex items-center gap-1.5 justify-end">
                              <FiCreditCard size={12} className="text-[var(--accent)]" />
                              <span className="font-black text-sm sm:text-lg tracking-tighter">₹{item.totalSpent}</span>
                            </div>
                          </div>
                        </div>

                        {/* Hover Decorative Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer Stats Accent */}
          <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
            <div className="flex items-center gap-2">
              <FiBarChart2 size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Global Analytics</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <FiAward size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">Verified Integrity</span>
            </div>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}
