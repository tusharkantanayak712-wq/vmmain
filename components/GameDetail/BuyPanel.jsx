"use client";

import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import logo from "@/public/logo.png";

export default function BuyPanel({
  activeItem,
  onBuy,
  redirecting,
  buyPanelRef,
}) {
  const calculateDiscount = (selling, dummy) => {
    if (!dummy || dummy <= selling) return null;
    return Math.round(((dummy - selling) / dummy) * 100);
  };

  const discount = calculateDiscount(activeItem.sellingPrice, activeItem.dummyPrice);

  return (
    <div
      ref={buyPanelRef}
      className="max-w-6xl mx-auto bg-gray-900/50 border border-gray-800 rounded-2xl p-6"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {/* Product Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-800 flex-shrink-0">
          <Image
            src={activeItem.itemImageId?.image || logo}
            alt={activeItem.itemName}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
            💎 {activeItem.itemName}
          </h2>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <p className="text-3xl font-black text-[var(--accent)]">
              ₹{activeItem.sellingPrice}
            </p>

            {activeItem.dummyPrice && (
              <>
                <p className="text-sm line-through text-gray-600">
                  ₹{activeItem.dummyPrice}
                </p>
                {discount && (
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={() => onBuy(activeItem)}
          disabled={redirecting}
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${redirecting
              ? "bg-gray-800 text-gray-600 cursor-not-allowed"
              : "bg-[var(--accent)] text-black hover:opacity-90"
            }`}
        >
          {redirecting ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FiShoppingCart size={18} />
              Buy Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
