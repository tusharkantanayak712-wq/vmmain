"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://game-off-ten.vercel.app/api/v1";

export default function PricingTab({
  pricingType,
  setPricingType,
  slabs,
  setSlabs,
  overrides,
  setOverrides,
  savingPricing,
  onSave,
}) {
  /* ================= API STATE ================= */

  const [games, setGames] = useState([]);
  const [itemsByGame, setItemsByGame] = useState({});

  /* ================= FETCH GAMES ================= */

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`${API_BASE}/games/list`);
        const json = await res.json();
        if (json.success) setGames(json.data.games);
      } catch (err) {
        console.error("Failed to fetch games", err);
      }
    };

    fetchGames();
  }, []);

  /* ================= FETCH ITEMS ================= */

  const fetchItemsForGame = async (gameSlug) => {
    if (!gameSlug || itemsByGame[gameSlug]) return;

    try {
      const res = await fetch(`${API_BASE}/games/${gameSlug}/items`);
      const json = await res.json();
      if (json.success) {
        setItemsByGame((prev) => ({
          ...prev,
          [gameSlug]: json.data.items,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  /* ================= VALIDATION ================= */

  const isValidSlabs = slabs.every(
    (s) =>
      s.min >= 0 &&
      s.max >= 0 &&
      s.percent >= 0 &&
      Number.isFinite(s.min) &&
      Number.isFinite(s.max) &&
      Number.isFinite(s.percent) &&
      s.max >= s.min
  );

  const isValidOverrides = overrides.every(
    (o) => o.fixedPrice >= 0 && Number.isFinite(o.fixedPrice)
  );

  const canSave =
    !savingPricing &&
    (slabs.length > 0 || overrides.length > 0) &&
    isValidSlabs &&
    isValidOverrides;

  /* ================= SLABS ================= */

  const updateSlab = (i, key, value) => {
    const next = [...slabs];
    next[i][key] = Math.max(0, Number(value) || 0);
    setSlabs(next);
  };

  const addSlab = () => {
    setSlabs([...slabs, { min: 0, max: 0, percent: 0 }]);
  };

  const deleteSlab = (i) => {
    setSlabs(slabs.filter((_, index) => index !== i));
  };

  /* ================= FIXED PRICES ================= */

  const updateOverride = (i, key, value) => {
    const next = [...overrides];
    next[i][key] =
      key === "fixedPrice" ? Math.max(0, Number(value) || 0) : value;
    setOverrides(next);
  };

  const addOverride = () => {
    setOverrides([
      ...overrides,
      { gameSlug: "", itemSlug: "", fixedPrice: 0 },
    ]);
  };

  const deleteOverride = (i) => {
    setOverrides(overrides.filter((_, index) => index !== i));
  };

  return (
    <div className="max-w-6xl space-y-10">
      {/* ================= HEADER ================= */}
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight">Pricing Rules</h2>
        <p className="text-sm text-gray/60 max-w-xl">
          Configure dynamic pricing logic with range-based markups and item-level overrides.
        </p>
      </div>

      {/* ================= INFO ================= */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-sm shadow-lg">
        <p className="font-semibold mb-3 text-gray">How pricing is calculated</p>
        <ul className="list-disc pl-5 space-y-2 text-gray/60">
          <li>
            <b>Price Range Markup</b> adds a percentage based on base price.
          </li>
          <li>
            <b>Fixed Item Price</b> overrides slab pricing.
          </li>
          <li>Fixed price always takes priority.</li>
          <li>Negative prices are not allowed.</li>
        </ul>
      </div>

      {/* ================= USER TYPE ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <span className="text-sm font-semibold text-gray/80">
          Apply pricing for
        </span>
        <select
          value={pricingType}
          onChange={(e) => setPricingType(e.target.value)}
          className="h-10 px-4 rounded-full border border-white/10 bg-black/40
                     text-sm font-semibold backdrop-blur
                     focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 transition"
        >
          <option value="user">Normal Users</option>
          <option value="member">Members</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* ================= SLAB PRICING ================= */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold">Price Range Markup</h3>
          <p className="text-sm text-gray/60">Example: ₹200 + 10% → ₹220</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-white/[0.04] text-gray/70">
              <tr>
                <th className="px-6 py-3 text-left">From (₹)</th>
                <th className="px-6 py-3 text-left">To (₹)</th>
                <th className="px-6 py-3 text-left">Extra %</th>
                <th className="px-6 py-3 text-right" />
              </tr>
            </thead>
            <tbody>
              {slabs.map((s, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={s.min}
                      onChange={(e) => updateSlab(i, "min", e.target.value)}
                      className="input h-10 md:h-9 text-base md:text-sm"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={s.max}
                      onChange={(e) => updateSlab(i, "max", e.target.value)}
                      className="input h-10 md:h-9 text-base md:text-sm"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={s.percent}
                      onChange={(e) =>
                        updateSlab(i, "percent", e.target.value)
                      }
                      className="input h-10 md:h-9 text-base md:text-sm"
                    />
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => deleteSlab(i)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4">
          <button
            onClick={addSlab}
            className="text-sm font-semibold text-[var(--accent)]"
          >
            + Add Price Range
          </button>
        </div>
      </section>

      {/* ================= FIXED PRICING ================= */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-lg">
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold">Fixed Item Pricing</h3>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {overrides.map((o, i) => (
            <div
              key={i}
              className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center
                         rounded-2xl border border-white/10 bg-black/30 p-4"
            >
              <input
                list="game-list"
                placeholder="Game"
                value={o.gameSlug}
                onChange={(e) => {
                  const slug = e.target.value;
                  updateOverride(i, "gameSlug", slug);
                  updateOverride(i, "itemSlug", "");
                  fetchItemsForGame(slug);
                }}
                className="input h-10 text-base md:text-sm"
              />

              <datalist id="game-list">
                {games.map((g) => (
                  <option key={g.gameSlug} value={g.gameSlug}>
                    {g.gameName}
                  </option>
                ))}
              </datalist>

              <input
                list={`item-list-${i}`}
                placeholder="Item"
                value={o.itemSlug}
                onChange={(e) => {
                  const slug = e.target.value;
                  updateOverride(i, "itemSlug", slug);
                  const item = itemsByGame[o.gameSlug]?.find(
                    (it) => it.itemSlug === slug
                  );
                  if (item) {
                    updateOverride(i, "fixedPrice", item.sellingPrice);
                  }
                }}
                className="input h-10 text-base md:text-sm"
              />

              <datalist id={`item-list-${i}`}>
                {(itemsByGame[o.gameSlug] || []).map((item) => (
                  <option key={item.itemSlug} value={item.itemSlug}>
                    {item.itemName}
                  </option>
                ))}
              </datalist>

              <input
                type="number"
                value={o.fixedPrice}
                onChange={(e) =>
                  updateOverride(i, "fixedPrice", e.target.value)
                }
                className="input h-10 text-base md:text-sm"
              />

              <button
                onClick={() => deleteOverride(i)}
                className="text-xs text-red-400 hover:text-red-300 sm:col-span-2 lg:col-span-1 sm:text-right"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={addOverride}
            className="text-sm font-semibold text-[var(--accent)]"
          >
            + Add Fixed Price
          </button>
        </div>
      </section>

      {/* ================= SAVE ================= */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={!canSave}
          className={`h-11 px-7 rounded-lg text-sm font-semibold transition
            w-full sm:w-auto
            ${
              canSave
                ? "bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90"
                : "bg-white/10 text-gray/40 cursor-not-allowed"
            }`}
        >
          {savingPricing ? "Saving..." : "Save Pricing"}
        </button>
      </div>
    </div>
  );
}
