"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Gamepad2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";
import MLBBPurchaseGuide from "../../../components/HelpImage/MLBBPurchaseGuide";

import ItemGrid from "@/components/GameDetail/ItemGrid";
import BuyPanel from "@/components/GameDetail/BuyPanel";
import ItemGridBgmi from "@/components/GameDetail/ItemGridBgmi";
import BuyPanelBgmi from "@/components/GameDetail/BuyPanelBgmi";

export default function GameDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const buyPanelRef = useRef(null);

  const [game, setGame] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allGames, setAllGames] = useState([]);
  const scrollContainerRef = useRef(null);

  const isBGMI =
    game?.gameName?.toLowerCase() === "pubg mobile" || game?.gameName?.toLowerCase() === "bgmi";



  /* ================= FETCH GAME ================= */
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        setError(false);
        const token = sessionStorage.getItem("token");

        const res = await fetch(`/api/games/${slug}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        const data = await res.json();

        if (data && data.success && data.data) {
          const items = [...(data?.data?.itemId || [])].sort(
            (a, b) => a.sellingPrice - b.sellingPrice
          );

          setGame({
            ...data.data,
            allItems: items,
          });

          setActiveItem(items[0] || null);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching game data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchGameData();
    }

    // Fetch all games for the top switcher
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.data?.games) {
          setAllGames(data.data.games);
        }
      })
      .catch((err) => console.error("Error fetching all games:", err));
  }, [slug]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  /* ================= LOADING & ERROR ================= */
  if (loading) {
    return <Loader />;
  }

  if (error || !game) {
    return (
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-10 rounded-[2.5rem] bg-[var(--card)] border border-[var(--border)] shadow-2xl max-w-md w-full relative overflow-hidden group"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-[0.03] rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700" />

          <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
            <Gamepad2 className="w-12 h-12 text-red-500" />
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Game Not Found</h2>
          <p className="text-[var(--muted)] mb-10 leading-relaxed">
            We couldn't retrieve the details for this game. It might be currently unavailable or the link is expired.
          </p>

          <Link
            href="/games"
            className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl bg-[var(--primary)] text-white font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[var(--primary)]/20"
          >
            <ArrowLeft className="w-5 h-5" />
            Explore Other Games
          </Link>
        </motion.div>
      </section>
    );
  }

  // Handle case where game is found but no items are available
  if (!activeItem) {
    return (
      <section className="min-h-screen bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header still shown */}
          <div className="mb-12 flex items-center gap-5">
            <div className="w-16 h-16 relative rounded-2xl overflow-hidden shadow-lg border border-[var(--border)]">
              <Image
                src={game?.gameImageId?.image || logo}
                alt={game?.gameName || "Game"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-black">{game?.gameName}</h1>
              <p className="text-sm text-[var(--muted)] font-medium uppercase tracking-wider">{game?.gameFrom}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-12 text-center shadow-xl flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-6">
              <Gamepad2 className="w-10 h-10 text-[var(--primary)]" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No Products Available</h3>
            <p className="text-[var(--muted)] max-w-sm mb-8">
              This game is currently active but doesn't have any items for sale at the moment. Please check back later!
            </p>
            <Link
              href="/games"
              className="text-[var(--primary)] font-bold flex items-center gap-2 hover:underline underline-offset-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Games
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ================= BUY HANDLER ================= */
  const goBuy = (item) => {
    if (redirecting) return;
    setRedirecting(true);

    const query = new URLSearchParams({
      name: item.itemName,
      price: item.sellingPrice?.toString() || "",
      dummy: item.dummyPrice?.toString() || "",
      image: item.itemImageId?.image || "",
    });

    // router.push(
    //   `/games/${slug}/buy/${item.itemSlug}?${query.toString()}`
    // );
    const isBGMI =
      game?.gameName?.toLowerCase() === "pubg mobile" || game?.gameName?.toLowerCase() === "bgmi";

    const basePath = isBGMI
      ? `/games/pubg/${slug}/buy`
      : `/games/${slug}/buy`;

    router.push(
      `${basePath}/${item.itemSlug}?${query.toString()}`
    );
  };

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-6">
      {/* ================= TOP GAME SWITCHER ================= */}
      <div className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-white/5 px-2 py-3 mb-6">
        <div className="max-w-6xl mx-auto relative group">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
          >
            {allGames.map((g) => {
              const isActive = g.gameSlug === slug;
              return (
                <Link
                  key={g.gameSlug}
                  href={`/games/${g.gameSlug}`}
                  className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all duration-300 min-w-[70px] ${isActive ? "opacity-100 scale-105" : "opacity-40 hover:opacity-100"
                    }`}
                >
                  <div className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 shadow-lg transition-all ${isActive ? "border-[var(--accent)]" : "border-transparent"
                    }`}>
                    <Image
                      src={g.gameImageId?.image || logo}
                      alt={g.gameName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter truncate w-full text-center ${isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"
                    }`}>
                    {g.gameName}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Scroll Buttons - Only visible on hover/desktop */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <FiChevronLeft className="text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <FiChevronRight className="text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* ================= HEADER ================= */}
        <div className="mb-6 flex items-center gap-4">
          <div className="w-14 h-14 relative rounded-lg overflow-hidden">
            <Image
              src={game?.gameImageId?.image || logo}
              alt={game?.gameName || "Game"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">
              {game?.gameName}
            </h1>
            <p className="text-xs text-[var(--muted)]">
              {game?.gameFrom}
            </p>
          </div>
        </div>

        {/* ================= ITEM GRID ================= */}
        {isBGMI ? (
          <ItemGridBgmi
            items={game.allItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            buyPanelRef={buyPanelRef}
          />
        ) : (
          <ItemGrid
            items={game.allItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            buyPanelRef={buyPanelRef}
          />
        )}

        {/* ================= BUY PANEL ================= */}
        {isBGMI ? (
          <BuyPanelBgmi
            activeItem={activeItem}
            onBuy={goBuy}
            redirecting={redirecting}
            buyPanelRef={buyPanelRef}
          />
        ) : (
          <BuyPanel
            activeItem={activeItem}
            onBuy={goBuy}
            redirecting={redirecting}
            buyPanelRef={buyPanelRef}
          />
        )}
        {/* <div className="max-w-6xl mx-auto mt-6">
        <MLBBPurchaseGuide />
      </div> */}
      </div>
    </section>
  );
}
