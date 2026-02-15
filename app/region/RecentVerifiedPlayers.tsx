"use client";

import { useEffect, useState } from "react";
import { FiClock, FiActivity, FiArrowRight } from "react-icons/fi";
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

  if (!players.length) return (
    <div className="text-gray-600 text-[10px] font-black uppercase text-center py-10 opacity-40 italic tracking-widest">
      0 Logs Found
    </div>
  );

  return (
    <div className="space-y-3">
      {players.map((p, index) => (
        <button
          key={`${p.playerId}-${p.zoneId}-${index}`}
          onClick={() => onSelect(p)}
          className="w-full text-left rounded-xl border border-gray-800 bg-gray-900/40 p-3 hover:border-gray-700 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gray-800 text-gray-500 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
              <FiActivity size={14} />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-xs uppercase truncate leading-none mb-1">
                {p.username || "Anonymous"}
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                ID: {p.playerId}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest block mb-1">
              {p.region}
            </span>
            <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-gray-600">
              <FiClock size={10} />
              {timeAgo(p.savedAt)}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
