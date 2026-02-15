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
      <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
        <h1 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">Leaderboard</h1>

        <div className="flex gap-4 mb-10 border-b border-gray-800 pb-4">
          <button
            onClick={() => setRange("weekly")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
              ${range === "weekly" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
          >
            <FiClock /> Weekly
          </button>
          <button
            onClick={() => setRange("monthly")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
              ${range === "monthly" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
          >
            <FiBarChart2 /> Monthly
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Synchronizing Rankings...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-800 rounded-3xl">
            <p className="text-gray-500 italic">No rankings available for this period.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={item.user?._id || index}
                className="flex items-center justify-between p-6 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-xl text-white font-black">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-white uppercase tracking-tight">
                      {item.user?.name || "Member"}
                    </h3>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                      Ranked Achiever
                    </p>
                  </div>
                </div>

                <div className="flex gap-10 text-right">
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Orders</p>
                    <p className="font-bold text-white flex items-center justify-end gap-2">
                      {item.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Contribution</p>
                    <p className="text-lg font-black text-[var(--accent)] tracking-tighter">
                      ₹{item.totalSpent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
          Top 10 Elite Members • Verified Data
        </div>
      </main>
    </AuthGuard>
  );
}
