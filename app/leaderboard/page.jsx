"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { FiAward, FiShoppingBag, FiCreditCard, FiClock, FiBarChart2 } from "react-icons/fi";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("weekly");

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

  return (
    <AuthGuard>
      <main className="max-w-4xl mx-auto px-6 py-12 text-[var(--muted)]">
        <h1 className="text-3xl font-black text-[var(--foreground)] mb-6 uppercase tracking-tight italic">Leaderboard</h1>

        <div className="flex gap-4 mb-10 border-b border-[var(--border)] pb-4">
          <button
            onClick={() => setRange("weekly")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${range === "weekly"
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg shadow-[var(--foreground)]/10"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/[0.03]"}`}
          >
            <FiClock /> Weekly
          </button>
          <button
            onClick={() => setRange("monthly")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${range === "monthly"
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-lg shadow-[var(--foreground)]/10"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/[0.03]"}`}
          >
            <FiBarChart2 /> Monthly
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--muted)] opacity-50">Syncing Rankings...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-3xl">
            <p className="text-[var(--muted)] italic">No rankings available for this period.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => {
              const isTop3 = index < 3;
              const rankColors = [
                "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-yellow-500/20",
                "bg-gradient-to-br from-slate-300 to-slate-500 shadow-slate-400/20",
                "bg-gradient-to-br from-orange-400 to-orange-700 shadow-orange-500/20",
              ];

              return (
                <div
                  key={item.user?._id || index}
                  className="flex items-center justify-between p-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--accent)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/5 transition-all group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-white shadow-lg ${isTop3 ? rankColors[index] : "bg-[var(--foreground)]/[0.05] text-[var(--foreground)]"}`}>
                      {isTop3 ? <FiAward size={20} /> : `#${index + 1}`}
                    </div>
                    <div>
                      <h3 className="font-black text-[var(--foreground)] uppercase tracking-tight flex items-center gap-2">
                        {item.user?.name || "Member"}
                        {index === 0 && <span className="text-[8px] bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full font-black">MVP</span>}
                      </h3>
                      <p className="text-[9px] text-[var(--muted)] uppercase font-black tracking-widest opacity-50">
                        Ranked Achiever
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-8 sm:gap-12 text-right">
                    <div className="hidden sm:block">
                      <p className="text-[9px] font-black uppercase text-[var(--muted)] mb-0.5 opacity-40 tracking-wider">Orders</p>
                      <p className="text-sm font-black text-[var(--foreground)] flex items-center justify-end gap-1.5 italic">
                        {item.totalOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase text-[var(--muted)] mb-0.5 opacity-40 tracking-wider">Contribution</p>
                      <p className="text-xl font-black text-[var(--accent)] tracking-tighter">
                        ₹{item.totalSpent}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
          Top 10 Elite Members • Verified Data
        </div>
      </main>
    </AuthGuard>
  );
}
