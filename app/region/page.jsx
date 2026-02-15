"use client";

import { useState } from "react";
import { FiUser, FiMapPin, FiGlobe, FiShield, FiCheckCircle, FiXCircle } from "react-icons/fi";
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
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Region Scanner</h1>
          <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mt-1">Identity Verification Tool</p>
        </div>
        <HelpImagePopup />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Scanner Form */}
        <section className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Account ID</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border border-gray-800 focus:border-[var(--accent)] outline-none font-bold text-white transition-all"
                placeholder="00000000"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Server Zone</label>
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border border-gray-800 focus:border-[var(--accent)] outline-none font-bold text-white transition-all"
                placeholder="0000"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={loading || !id || !zone}
            className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Verifying..." : <><FiGlobe /> Initiate Scan</>}
          </button>

          {result && (
            <div className={`p-6 rounded-2xl border ${result.success === 200 ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
              {result.success === 200 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <FiCheckCircle size={20} />
                    <span className="font-black uppercase text-xs tracking-tight">Verified: {result.data?.username}</span>
                  </div>
                  <p className="text-xs font-bold text-[var(--accent)] uppercase tracking-widest">Region: {result.data?.region}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-red-400">
                  <FiXCircle size={20} />
                  <span className="font-black uppercase text-xs tracking-tight">Scan Failed: ID Not Found</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Recent Searches */}
        <section className="p-8 bg-gray-900/30 border border-gray-800 rounded-[2rem]">
          <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-gray-800 pb-4 flex items-center gap-2">
            <FiShield size={14} className="text-[var(--accent)]" />
            Recent Verified
          </h2>
          <RecentVerifiedPlayers
            limit={8}
            onSelect={(player) => {
              setId(player.playerId);
              setZone(player.zoneId);
              setResult(null);
            }}
          />
        </section>
      </div>
    </main>
  );
}
