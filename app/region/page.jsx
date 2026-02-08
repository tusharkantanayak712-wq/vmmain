"use client";

import { useState } from "react";
import { FiUser, FiMapPin, FiCheckCircle, FiXCircle, FiLoader, FiGlobe, FiShield, FiCpu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import HelpImagePopup from "../../components/HelpImage/HelpImagePopup";
import { saveVerifiedPlayer } from "@/utils/storage/verifiedPlayerStorage";
import RecentVerifiedPlayers from "./RecentVerifiedPlayers";

export default function RegionPage() {
  const [id, setId] = useState("");
  const [zone, setZone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!id || !zone) return;
    setLoading(true);

    try {
      const res = await fetch("/api/check-region", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, zone }),
      });

      const data = await res.json();
      setResult(data);

      if (data?.success === 200) {
        saveVerifiedPlayer({
          playerId: id,
          zoneId: zone,
          username: data.data.username,
          region: data.data.region,
          savedAt: Date.now(),
        });
      }
    } catch (error) {
      setResult({ success: 500, message: "Verification failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[var(--accent)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col mb-8"
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
              <FiShield size={10} />
              Scanner v2.0
            </div>
            <HelpImagePopup />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Region Scanner</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--muted)] opacity-60 mt-1">
            Global Database Verification
          </p>
        </motion.div>

        {/* ================= MAIN SCANNER CARD ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--card)]/40 backdrop-blur-xl border border-[var(--border)] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Inner Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--accent)]/10 blur-[40px] pointer-events-none" />

          <div className="space-y-5">
            {/* Player ID Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] ml-1">Account ID</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-[var(--accent)] text-[var(--muted)]">
                  <FiUser size={18} />
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)]
                             focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]
                             transition-all duration-300 font-bold placeholder:text-[var(--muted)]/40 text-[var(--foreground)]"
                  placeholder="00000000"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </div>

            {/* Zone ID Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] ml-1">Server Zone</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-[var(--accent)] text-[var(--muted)]">
                  <FiMapPin size={18} />
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[var(--card)]/50 border border-[var(--border)]
                             focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]
                             transition-all duration-300 font-bold placeholder:text-[var(--muted)]/40 text-[var(--foreground)]"
                  placeholder="0000"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                />
              </div>
            </div>

            {/* Scan Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheck}
              disabled={loading || !id || !zone}
              className="
                w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] text-white
                bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/20
                hover:shadow-[var(--accent)]/40 transition-all duration-300
                disabled:opacity-40 disabled:grayscale
                flex items-center justify-center gap-3 overflow-hidden relative
              "
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={16} />
                  Initializing...
                </>
              ) : (
                <>
                  <FiGlobe size={16} />
                  Initiate Scan
                </>
              )}

              {/* Shine Effect */}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* ================= RESULT DISPLAY ================= */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`
                mt-8 rounded-[2rem] p-6 border backdrop-blur-md shadow-xl
                ${result.success === 200
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-red-500/5 border-red-500/20"
                }
              `}
            >
              {result.success === 200 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <FiCheckCircle size={22} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest leading-tight opacity-60">Status</span>
                        <span className="font-black text-sm uppercase tracking-tighter">Identity Verified</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-black text-emerald-400">
                      SUCCESS
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-500/10">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 mb-1">Username</span>
                      <span className="font-bold text-sm truncate">{result.data?.username}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 mb-1">Region</span>
                      <span className="font-bold text-sm text-[var(--accent)]">{result.data?.region}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-red-400">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <FiXCircle size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight opacity-60">Failed</span>
                    <span className="font-black text-sm uppercase tracking-tight">Scanner Error: ID Not Found</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= RECENT LOGS ================= */}
        <div className="mt-8">
          <RecentVerifiedPlayers
            limit={10}
            onSelect={(player) => {
              setId(player.playerId);
              setZone(player.zoneId);
              setResult(null); // Clear previous result
            }}
          />
        </div>

        {/* Footer Technical Accent */}
        <div className="mt-12 flex items-center justify-center gap-4 opacity-30">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--border)]" />
          <FiCpu className="text-[var(--muted)]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--border)]" />
        </div>

      </div>
    </section>
  );
}
