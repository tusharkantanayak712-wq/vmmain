"use client";

import { FiZap } from "react-icons/fi";

export default function ItemGrid({
  items,
  activeItem,
  setActiveItem,
  buyPanelRef,
}) {
  const calculateDiscount = (selling, dummy) => {
    if (!dummy || dummy <= selling) return null;
    return Math.round(((dummy - selling) / dummy) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {items.map((item) => {
          const isActive = activeItem?.itemSlug === item.itemSlug;
          const discount = calculateDiscount(item.sellingPrice, item.dummyPrice);

          return (
            <div
              key={item.itemSlug}
              onClick={() => {
                setActiveItem(item);
                buyPanelRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className={`group relative rounded-2xl border-2 p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${isActive
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg shadow-[var(--accent)]/20"
                  : "border-gray-800 bg-gray-900/40 hover:border-[var(--accent)]/50 hover:bg-gray-900/60"
                }`}
            >
              {/* Discount Badge */}
              {discount && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <FiZap size={10} />
                  {discount}% OFF
                </div>
              )}

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute top-3 left-3 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              )}

              {/* Item Name */}
              <div className="mb-3 mt-1">
                <p className="text-sm font-bold text-white truncate uppercase tracking-tight">
                  💎 {item.itemName}
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-black text-[var(--accent)] tracking-tighter">
                    ₹{item.sellingPrice}
                  </p>
                  {item.dummyPrice && (
                    <p className="text-xs line-through text-gray-600 font-medium">
                      ₹{item.dummyPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent rounded-2xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
