"use client";

import { useEffect, useState } from "react";
import { FiClock, FiActivity, FiArrowRight, FiUserCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getVerifiedPlayers } from "@/utils/storage/verifiedPlayerStorage";

function timeAgo(ts?: number) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

export default function RecentVerifiedPlayers({
  onSelect,
  limit = 10,
}: {
  onSelect: (player: any) => void;
  limit?: number;
}) {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    setPlayers(getVerifiedPlayers(limit));
  }, [limit]);

  if (!players.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 blur-[50px] pointer-events-none" />

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
            <FiUserCheck size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-60">Verified Logs</span>
            <h4 className="text-sm font-black text-[var(--foreground)] tracking-tight">Recent Lookups</h4>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[9px] font-black uppercase tracking-widest text-[var(--accent)]">
          {players.length} Records
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {players.map((p, index) => (
            <motion.button
              key={`${p.playerId}-${p.zoneId}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(p)}
              className="
                w-full text-left
                rounded-2xl border border-[var(--border)]
                bg-[var(--card)]/50 hover:bg-[var(--card)]
                hover:border-[var(--accent)]/50
                transition-all duration-300
                p-3.5
                group
                relative
                overflow-hidden
              "
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/5 flex-shrink-0 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                    <FiActivity size={18} className="text-[var(--accent)] group-hover:text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-black text-[var(--foreground)] truncate leading-tight">
                      {p.username || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-tight">ID: {p.playerId}</span>
                      <div className="w-1 h-1 rounded-full bg-[var(--border)]" />
                      <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-tight">Zone: {p.zoneId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-[var(--accent)] text-white uppercase tracking-widest">
                    {p.region}
                  </span>
                  {p.savedAt && (
                    <div className="flex items-center gap-1 text-[9px] font-bold text-[var(--muted)] opacity-60">
                      <FiClock size={10} />
                      {timeAgo(p.savedAt)}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-300">
                <FiArrowRight className="text-[var(--accent)]" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]/50 flex justify-center">
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--muted)] opacity-40">End of records</span>
      </div>
    </motion.div>
  );
}
