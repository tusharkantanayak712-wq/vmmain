"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiFilter, FiX, FiSearch, FiZap, FiTarget, FiBox, FiLayers, FiShoppingBag } from "react-icons/fi";
import logo from "@/public/logo.png";
import GamesFilterModal from "@/components/Games/GamesFilterModal";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);
  const [otts, setOtts] = useState(null);
  const [memberships, setMemberships] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az"); // az | za
  const [hideOOS, setHideOOS] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";
  const outOfStockGames = ["Genshin Impact", "Honor Of Kings", "TEST 1", "Wuthering of Waves", "Where Winds Meet", "mlbb-russia953"];

  const isOutOfStock = (name) => outOfStockGames.includes(name);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data?.category || []);
        setOtts(data?.data?.otts || null);
        setMemberships(data?.data?.memberships || null);
        setGames((data?.data?.games || []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeFilterCount = (sort !== "az" ? 1 : 0) + (hideOOS ? 1 : 0);

  const processGames = (list) => {
    let filtered = [...list];
    if (hideOOS) filtered = filtered.filter((g) => !isOutOfStock(g.gameName));
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((g) => g.gameName.toLowerCase().includes(q) || g.gameFrom?.toLowerCase().includes(q));
    }
    filtered.sort((a, b) => sort === "az" ? a.gameName.localeCompare(b.gameName) : b.gameName.localeCompare(a.gameName));
    return filtered;
  };

  const injectSpecialGame = (cat) => {
    if (!cat.categoryTitle?.toLowerCase().includes("mobile legends")) return cat.gameId || [];
    const specialGame = games.find((g) => g.gameName === SPECIAL_MLBB_GAME);
    if (!specialGame) return cat.gameId || [];
    const withoutDuplicate = (cat.gameId || []).filter((g) => g.gameName !== SPECIAL_MLBB_GAME);
    return [specialGame, ...withoutDuplicate];
  };

  /* ================= SUB-COMPONENTS ================= */

  const SectionHeader = ({ title }) => (
    <div className="flex items-center gap-4 mb-8 sm:mb-10">
      <div className="relative">
        <h2 className="text-xl sm:text-2xl font-black text-[var(--foreground)] uppercase tracking-tighter">
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full"
        />
      </div>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );

  const GameCard = ({ game, index = 0 }) => {
    const disabled = isOutOfStock(game.gameName);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, delay: index * 0.02 }}
        className="group relative"
      >
        <Link
          href={disabled ? "#" : `/games/${game.gameSlug}`}
          className={`relative flex items-center gap-4 p-3 sm:p-4 rounded-xl sm:rounded-3xl overflow-hidden border transition-all duration-500 block ${disabled ? "opacity-40 cursor-not-allowed border-white/5 bg-white/[0.02]" : "border-white/5 hover:border-[var(--accent)]/40 bg-gradient-to-br from-white/[0.05] to-transparent hover:from-white/[0.1] hover:to-[var(--accent)]/[0.05] shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            }`}
        >
          {/* IMAGE */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
            <Image
              src={game.gameImageId?.image || logo}
              alt={game.gameName}
              fill
              className={`object-cover transition-transform duration-700 ${disabled ? "grayscale" : "group-hover:scale-110"}`}
            />
            {!disabled && (
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            {disabled && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                <FiX className="text-red-500 text-xl" />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-[15px] sm:text-[18px] font-black text-[var(--foreground)] leading-tight group-hover:text-[var(--accent)] transition-colors uppercase tracking-tight truncate">
                {game.gameName}
              </h3>
              {!disabled && game.tagId && (
                <div
                  className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-[var(--accent)] text-black hidden sm:inline-block shadow-[0_4px_10px_rgba(var(--accent-rgb),0.3)]"
                >
                  {game.tagId.tagName}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 opacity-40 group-hover:opacity-100 transition-all text-[var(--foreground)]">
              <div className="flex items-center gap-1.5">
                <FiTarget size={12} className="text-[var(--accent)]" />
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate">
                  {game.gameFrom}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 border-l border-current/20 pl-4">
                <FiLayers size={12} className="text-purple-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <div className="flex-shrink-0">
            {!disabled ? (
              <div className="relative group/btn">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-current/5 border border-current/10 text-[var(--foreground)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-300 shadow-xl overflow-hidden">
                  <FiShoppingBag size={20} className="relative z-10 group-hover/btn:scale-110 transition-transform" />
                </div>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Inactive</span>
              </div>
            )}
          </div>

          {/* DECORATIVE ACCENT */}
          <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-[var(--accent)]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-24 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen bg-[var(--background)] relative overflow-hidden pb-10">
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--accent)]/[0.03] to-transparent" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--accent)]/[0.05] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_40px] opacity-10" />
      </div>

      {/* ================= HUD SEARCH BAR ================= */}
      <div className="sticky top-[64px] z-40 px-2 sm:px-4 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2 p-1.5 sm:p-2 bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-xl sm:rounded-2xl shadow-xl"
          >
            {/* SEARCH */}
            <div className="relative flex-1 group">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/20 group-focus-within:text-[var(--accent)] transition-colors text-sm sm:text-base" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search games..."
                className="w-full h-10 sm:h-11 rounded-lg sm:rounded-xl bg-current/5 border border-transparent pl-9 sm:pl-10 pr-10 text-[13px] font-bold text-[var(--foreground)] placeholder:text-[var(--foreground)]/20 outline-none focus:border-[var(--accent)]/30 focus:bg-current/[0.08] transition-all"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md bg-current/10 text-[var(--foreground)]/40 hover:text-red-500"
                  >
                    <FiX size={12} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* FILTER BUTTON */}
            <button
              onClick={() => setShowFilter(true)}
              className={`h-10 sm:h-11 px-3 sm:px-5 flex items-center gap-2 rounded-lg sm:rounded-xl border font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all ${activeFilterCount > 0
                ? "bg-[var(--accent)] text-black border-[var(--accent)]"
                : "bg-current/5 border-[var(--border)] text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                }`}
            >
              <FiFilter className={activeFilterCount > 0 ? "animate-pulse" : ""} size={14} />
              <span className="hidden xs:inline">Filters</span>
              {activeFilterCount > 0 && <span className="text-[10px] bg-black/20 px-1.5 rounded-md ml-1">{activeFilterCount}</span>}
            </button>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-12 sm:space-y-20">

        {/* CATEGORY SECTIONS */}
        <div className="space-y-12 sm:space-y-20">
          {category.map((cat, i) => {
            const merged = injectSpecialGame(cat);
            const filtered = processGames(merged);
            if (!filtered.length) return null;

            return (
              <div key={i}>
                <SectionHeader title={cat.categoryTitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {filtered.map((game, index) => (
                    <GameCard key={game.gameName} game={game} index={index} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* ALL GAMES GRID */}
          <div>
            <SectionHeader title="All Games" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {processGames(games).map((game, i) => (
                <GameCard key={i} game={game} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* MEMBERSHIPS (Below Games) */}
        {memberships?.items?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader title={memberships.title || "Passes & Plans"} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {memberships.items.map((plan, idx) => (
                <Link
                  key={plan.slug}
                  href={`/games/membership/${plan.slug}`}
                  className="group relative rounded-xl sm:rounded-2xl bg-[var(--card)] border border-white/5 p-3.5 sm:p-5 flex items-center gap-4 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-white/[0.08]"
                >
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Image src={plan.image} alt={plan.name} fill className="object-contain drop-shadow-xl" />
                  </div>
                  <div className="flex-1 min-w-0 text-[var(--foreground)]">
                    <h3 className="text-[13px] sm:text-[15px] font-bold uppercase tracking-tight mb-0.5 group-hover:text-[var(--accent)] transition-colors truncate">
                      {plan.name}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-bold opacity-30 uppercase tracking-wider">
                      {plan.duration}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-current/5 border border-current/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                      <FiZap size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* EMPTY STATE */}
        {!loading && processGames(games).length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-[var(--foreground)]">
            <div className="w-16 h-16 rounded-full bg-current/5 border border-current/10 flex items-center justify-center opacity-20 mb-6">
              <FiBox size={32} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-2">No Games Found</h3>
            <p className="text-xs opacity-40">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* FILTER MODAL */}
      {showFilter && (
        <GamesFilterModal
          open={showFilter}
          onClose={() => setShowFilter(false)}
          sort={sort}
          setSort={setSort}
          hideOOS={hideOOS}
          setHideOOS={setHideOOS}
        />
      )}
    </section>
  );
}
