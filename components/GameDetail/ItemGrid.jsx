"use client";

export default function ItemGrid({
  items,
  activeItem,
  setActiveItem,
  buyPanelRef,
}) {
  return (
    <div className="max-w-6xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.itemSlug}
          onClick={() => {
            setActiveItem(item);
            buyPanelRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
          className={`rounded-xl border p-4 cursor-pointer transition
            ${
              activeItem.itemSlug === item.itemSlug
                ? "border-[var(--accent)] bg-[var(--card)]"
                : "border-[var(--border)] hover:border-[var(--accent)]"
            }`}
        >
          <p className="text-sm font-semibold truncate">
            💎 {item.itemName}
          </p>

          <p className="mt-1 text-lg font-bold text-[var(--accent)]">
            ₹{item.sellingPrice}
          </p>

          {item.dummyPrice && (
            <p className="text-xs line-through text-[var(--muted)]">
              ₹{item.dummyPrice}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
