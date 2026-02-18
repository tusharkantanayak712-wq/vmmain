"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiFilter, FiX, FiSearch, FiZap, FiBox, FiShoppingBag,
  FiGlobe, FiGrid, FiList, FiChevronRight, FiTv, FiPackage,
  FiStar, FiTrendingUp, FiAward
} from "react-icons/fi";
import logo from "@/public/logo.png";
import GamesFilterModal from "@/components/Games/GamesFilterModal";

/* ─────────────────────────────────────────────────────── */
/*  SKELETON CARD                                          */
/* ─────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="relative flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden animate-pulse">
    <div className="w-24 h-24 rounded-xl bg-white/5 flex-shrink-0" />
    <div className="flex-1 space-y-3">
      <div className="h-4 bg-white/5 rounded-lg w-3/4" />
      <div className="h-3 bg-white/5 rounded-lg w-1/2" />
      <div className="h-3 bg-white/5 rounded-lg w-1/3" />
    </div>
    <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0" />
    {/* shimmer */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
  </div>
);

/* ─────────────────────────────────────────────────────── */
/*  MAIN PAGE                                              */
/* ─────────────────────────────────────────────────────── */
export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);
  const [otts, setOtts] = useState(null);
  const [memberships, setMemberships] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ── FILTER STATE ── */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az");
  const [hideOOS, setHideOOS] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list | grid
  const [activeCategory, setActiveCategory] = useState("all");

  const searchRef = useRef(null);

  /* ── CONFIG ── */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";
  const outOfStockGames = [
    "Genshin Impact", "Honor Of Kings", "TEST 1",
    "Wuthering of Waves", "Where Winds Meet", "mlbb-russia953",
  ];
  const isOutOfStock = (name) => outOfStockGames.includes(name);

  /* ── FETCH ── */
  useEffect(() => {
    fetch("/api/games")
      .then((r) => r.json())
      .then((data) => {
        setCategory(data?.data?.category || []);
        setOtts(data?.data?.otts || null);
        setMemberships(data?.data?.memberships || null);
        setGames(data?.data?.games || []);
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
      filtered = filtered.filter(
        (g) => g.gameName.toLowerCase().includes(q) || g.gameFrom?.toLowerCase().includes(q)
      );
    }
    filtered.sort((a, b) =>
      sort === "az" ? a.gameName.localeCompare(b.gameName) : b.gameName.localeCompare(a.gameName)
    );
    return filtered;
  };

  const injectSpecialGame = (cat) => {
    if (!cat.categoryTitle?.toLowerCase().includes("mobile legends")) return cat.gameId || [];
    const specialGame = games.find((g) => g.gameName === SPECIAL_MLBB_GAME);
    if (!specialGame) return cat.gameId || [];
    const withoutDuplicate = (cat.gameId || []).filter((g) => g.gameName !== SPECIAL_MLBB_GAME);
    return [specialGame, ...withoutDuplicate];
  };

  /* ── CATEGORY TABS ── */
  const categoryTabs = [
    { id: "all", label: "All Games", icon: <FiGrid size={13} /> },
    ...category.map((c) => ({ id: c.categoryTitle, label: c.categoryTitle, icon: <FiStar size={13} /> })),
    ...(otts?.items?.length ? [{ id: "ott", label: "Streaming", icon: <FiTv size={13} /> }] : []),
    ...(memberships?.items?.length ? [{ id: "membership", label: "Memberships", icon: <FiPackage size={13} /> }] : []),
  ];

  const totalGames = games.length;
  const availableGames = games.filter((g) => !isOutOfStock(g.gameName)).length;

  /* ─────────────────────────────────────────────────────── */
  /*  SECTION HEADER                                         */
  /* ─────────────────────────────────────────────────────── */
  const SectionHeader = ({ title, count }) => (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-black text-[var(--foreground)] uppercase tracking-tighter">
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full"
        />
      </div>
      {count !== undefined && (
        <span className="px-2 py-0.5 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">
          {count}
        </span>
      )}
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );

  /* ─────────────────────────────────────────────────────── */
  /*  GAME CARD – LIST VIEW                                  */
  /* ─────────────────────────────────────────────────────── */
  const GameCardList = ({ game, index = 0 }) => {
    const disabled = isOutOfStock(game.gameName);
    const region = game.gameFrom || "Global";
    const isIndia = region.toLowerCase().includes("india") || region.toLowerCase().includes("in");

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, delay: index * 0.025 }}
        className="group relative"
      >
        <Link
          href={disabled ? "#" : `/games/${game.gameSlug}`}
          className={`relative flex items-center gap-4 sm:gap-5 p-3.5 sm:p-4 rounded-2xl overflow-hidden border transition-all duration-400 block ${disabled
              ? "opacity-40 cursor-not-allowed border-[var(--border)]/50 bg-[var(--card)]/50"
              : "border-[var(--border)] hover:border-[var(--accent)]/40 bg-[var(--card)] hover:bg-[var(--card)]/80 shadow-md hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            }`}
        >
          {/* IMAGE */}
          <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-xl group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.15)] transition-all duration-500">
            <Image
              src={game.gameImageId?.image || logo}
              alt={game.gameName}
              fill
              className={`object-cover transition-transform duration-700 ${disabled ? "grayscale" : "scale-105 group-hover:scale-110"}`}
            />
            {!disabled && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
            )}
            {disabled && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                <FiX className="text-red-500 text-xl" />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] sm:text-[17px] font-black text-[var(--foreground)] leading-tight group-hover:text-[var(--accent)] transition-colors uppercase tracking-tight truncate mb-1.5">
              {game.gameName}
            </h3>
            <div className="flex items-center flex-wrap gap-1.5">
              {/* Region */}
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wider ${isIndia
                  ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                }`}>
                <FiGlobe size={9} />
                {region}
              </span>
              {/* Tag */}
              {!disabled && game.tagId && (
                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-[var(--accent)]/5 border border-[var(--accent)]/15 text-[var(--accent)]/70 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/30 transition-all">
                  {game.tagId.tagName}
                </span>
              )}
              {disabled && (
                <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-red-500/10 border border-red-500/20 text-red-400">
                  Sold Out
                </span>
              )}
            </div>
          </div>

          {/* ACTION */}
          <div className="flex-shrink-0">
            {!disabled ? (
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-black group-hover:border-[var(--accent)] transition-all duration-300 text-[var(--foreground)]/50">
                  <FiChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <div className="absolute inset-0 bg-[var(--accent)]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center">
                <FiX size={14} className="text-red-500/50" />
              </div>
            )}
          </div>

          {/* BG EFFECTS */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 h-24 bg-[var(--accent)]/8 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full pointer-events-none" />
        </Link>
      </motion.div>
    );
  };

  /* ─────────────────────────────────────────────────────── */
  /*  GAME CARD – GRID VIEW                                  */
  /* ─────────────────────────────────────────────────────── */
  const GameCardGrid = ({ game, index = 0 }) => {
    const disabled = isOutOfStock(game.gameName);
    const region = game.gameFrom || "Global";

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
        className="group relative"
      >
        <Link
          href={disabled ? "#" : `/games/${game.gameSlug}`}
          className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-400 block ${disabled
              ? "opacity-40 cursor-not-allowed border-[var(--border)]/50 bg-[var(--card)]/50"
              : "border-[var(--border)] hover:border-[var(--accent)]/40 bg-[var(--card)] shadow-md hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            }`}
        >
          {/* IMAGE */}
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src={game.gameImageId?.image || logo}
              alt={game.gameName}
              fill
              className={`object-cover transition-transform duration-700 ${disabled ? "grayscale" : "scale-105 group-hover:scale-115"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {disabled && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
                <span className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest">
                  Sold Out
                </span>
              </div>
            )}
            {/* Region badge */}
            <div className="absolute top-2 left-2">
              <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider backdrop-blur-sm ${region.toLowerCase().includes("india") || region.toLowerCase().includes("in")
                  ? "bg-orange-500/20 border border-orange-500/30 text-orange-300"
                  : "bg-blue-500/20 border border-blue-500/30 text-blue-300"
                }`}>
                <FiGlobe size={7} />
                {region}
              </span>
            </div>
            {/* Tag */}
            {!disabled && game.tagId && (
              <div className="absolute top-2 right-2">
                <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] backdrop-blur-sm">
                  {game.tagId.tagName}
                </span>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-3 flex items-center justify-between gap-2">
            <h3 className="text-[12px] font-black text-[var(--foreground)] uppercase tracking-tight truncate group-hover:text-[var(--accent)] transition-colors">
              {game.gameName}
            </h3>
            {!disabled && (
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)] group-hover:text-black group-hover:border-[var(--accent)] transition-all duration-300 text-[var(--foreground)]/40">
                <FiShoppingBag size={12} />
              </div>
            )}
          </div>

          {/* GLOW */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>
      </motion.div>
    );
  };

  /* ─────────────────────────────────────────────────────── */
  /*  RENDER                                                 */
  /* ─────────────────────────────────────────────────────── */
  const filteredAllGames = processGames(games);

  return (
    <section className="min-h-screen bg-[var(--background)] relative overflow-hidden pb-16">

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[var(--accent)]/[0.04] to-transparent" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[var(--accent)]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:60px_60px] opacity-100" />
      </div>

      {/* ── HERO HEADER ── */}
      <div className="relative z-10 pt-8 pb-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 rounded-full bg-[var(--accent)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                Top-Up Store
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--foreground)] uppercase tracking-tighter leading-none">
              Game{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]">
                Library
              </span>
            </h1>
            <p className="text-[var(--foreground)]/40 text-xs sm:text-sm mt-1.5 font-medium">
              Instant top-ups for your favourite games
            </p>
          </div>

          {/* STATS */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <FiTrendingUp size={13} className="text-[var(--accent)]" />
                <div>
                  <div className="text-[11px] font-black text-[var(--foreground)]">{totalGames}</div>
                  <div className="text-[9px] text-[var(--foreground)]/40 uppercase tracking-wider font-bold">Games</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <FiAward size={13} className="text-emerald-400" />
                <div>
                  <div className="text-[11px] font-black text-[var(--foreground)]">{availableGames}</div>
                  <div className="text-[9px] text-[var(--foreground)]/40 uppercase tracking-wider font-bold">Live</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ── STICKY SEARCH + CONTROLS ── */}
      <div className="sticky top-[60px] z-40 px-3 sm:px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 p-1.5 bg-[var(--card)]/85 backdrop-blur-2xl border border-[var(--border)] rounded-xl shadow-2xl shadow-black/20"
          >
            {/* SEARCH */}
            <div className="relative flex-1 group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/25 group-focus-within:text-[var(--accent)] transition-colors text-sm" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search games..."
                className="w-full h-9 sm:h-10 rounded-lg bg-white/[0.04] border border-transparent pl-9 pr-9 text-[12px] sm:text-[13px] font-bold text-[var(--foreground)] placeholder:text-[var(--foreground)]/20 outline-none focus:border-[var(--accent)]/30 focus:bg-white/[0.07] transition-all"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-md bg-white/10 text-[var(--foreground)]/40 hover:text-red-400 transition-colors"
                  >
                    <FiX size={11} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* VIEW TOGGLE */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
              <button
                onClick={() => setViewMode("list")}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${viewMode === "list"
                    ? "bg-[var(--accent)] text-black shadow-md"
                    : "text-[var(--foreground)]/40 hover:text-[var(--foreground)]"
                  }`}
              >
                <FiList size={14} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${viewMode === "grid"
                    ? "bg-[var(--accent)] text-black shadow-md"
                    : "text-[var(--foreground)]/40 hover:text-[var(--foreground)]"
                  }`}
              >
                <FiGrid size={14} />
              </button>
            </div>

            {/* FILTER BUTTON */}
            <button
              onClick={() => setShowFilter(true)}
              className={`h-9 sm:h-10 px-3 sm:px-4 flex items-center gap-1.5 rounded-lg border font-bold text-[11px] uppercase tracking-wider transition-all ${activeFilterCount > 0
                  ? "bg-[var(--accent)] text-black border-[var(--accent)]"
                  : "bg-white/[0.04] border-white/[0.08] text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:border-white/20"
                }`}
            >
              <FiFilter size={13} className={activeFilterCount > 0 ? "animate-pulse" : ""} />
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded-md">{activeFilterCount}</span>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── CATEGORY TABS ── */}
      {!loading && (
        <div className="relative z-10 px-3 sm:px-4 mt-3 mb-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === tab.id
                      ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-md shadow-[var(--accent)]/20"
                      : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:border-[var(--accent)]/30"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-10">

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && (
          <>
            {/* ── CATEGORY SECTIONS ── */}
            {(activeCategory === "all" || category.some((c) => c.categoryTitle === activeCategory)) && (
              <AnimatePresence mode="wait">
                <div className="space-y-10">
                  {category
                    .filter((cat) => activeCategory === "all" || cat.categoryTitle === activeCategory)
                    .map((cat, i) => {
                      const merged = injectSpecialGame(cat);
                      const filtered = processGames(merged);
                      if (!filtered.length) return null;
                      return (
                        <motion.div
                          key={cat.categoryTitle}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <SectionHeader title={cat.categoryTitle} count={filtered.length} />
                          {viewMode === "list" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {filtered.map((game, idx) => (
                                <GameCardList key={game.gameName} game={game} index={idx} />
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                              {filtered.map((game, idx) => (
                                <GameCardGrid key={game.gameName} game={game} index={idx} />
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                  {/* ALL GAMES */}
                  {activeCategory === "all" && filteredAllGames.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <SectionHeader title="All Games" count={filteredAllGames.length} />
                      {viewMode === "list" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {filteredAllGames.map((game, i) => (
                            <GameCardList key={game._id || i} game={game} index={i} />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {filteredAllGames.map((game, i) => (
                            <GameCardGrid key={game._id || i} game={game} index={i} />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            )}

            {/* ── OTT SECTION ── */}
            {(activeCategory === "all" || activeCategory === "ott") && otts?.items?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <SectionHeader title={otts.title || "Streaming Services"} count={otts.items.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {otts.items.map((ott, idx) => (
                    <motion.div
                      key={ott.slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={`/games/ott/${ott.slug}`}
                        className="group relative flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden"
                      >
                        <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <Image src={ott.image} alt={ott.name} fill className="object-contain drop-shadow-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-black uppercase tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
                            {ott.name}
                          </h3>
                          <span className="text-[9px] font-bold opacity-30 uppercase tracking-wider">
                            {ott.duration || "Streaming"}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[var(--foreground)]/30 group-hover:bg-[var(--accent)] group-hover:text-black group-hover:border-[var(--accent)] transition-all">
                          <FiTv size={13} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── MEMBERSHIPS SECTION ── */}
            {(activeCategory === "all" || activeCategory === "membership") && memberships?.items?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <SectionHeader title={memberships.title || "Passes & Plans"} count={memberships.items.length} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {memberships.items.map((plan, idx) => (
                    <motion.div
                      key={plan.slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={`/games/membership/${plan.slug}`}
                        className="group relative flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden"
                      >
                        <div className="relative w-12 h-12 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <Image src={plan.image} alt={plan.name} fill className="object-contain drop-shadow-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-black uppercase tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
                            {plan.name}
                          </h3>
                          <span className="text-[9px] font-bold opacity-30 uppercase tracking-wider">
                            {plan.duration}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black group-hover:border-[var(--accent)] transition-all">
                          <FiZap size={13} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── EMPTY STATE ── */}
            {!loading && filteredAllGames.length === 0 && search && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mb-5 opacity-40">
                  <FiBox size={28} className="text-[var(--foreground)]" />
                </div>
                <h3 className="text-base font-black uppercase tracking-widest text-[var(--foreground)] mb-2">
                  No Results
                </h3>
                <p className="text-xs text-[var(--foreground)]/30 mb-5">
                  No games found for &quot;{search}&quot;
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="px-4 py-2 rounded-xl bg-[var(--accent)] text-black text-[11px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ── FILTER MODAL ── */}
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
