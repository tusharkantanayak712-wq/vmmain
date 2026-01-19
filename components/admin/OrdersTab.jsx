"use client";

import { useState, useEffect } from "react";

export default function OrdersTab({ orders = [], onUpdateStatus }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">
          Orders
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Review, verify, and manage customer orders.
        </p>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5">
            <tr className="text-xs uppercase tracking-wide text-[var(--muted)]">
              <th className="px-5 py-3 text-left">Game</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Item</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o._id}
                onClick={() => setSelectedOrder(o)}
                className="border-t border-[var(--border)] hover:bg-black/5 cursor-pointer transition"
              >
                <td className="px-5 py-4 font-medium capitalize">
                  {o.gameSlug}
                </td>

                <td className="px-5 py-4 text-xs text-[var(--muted)]">
                  {new Date(o.createdAt).toLocaleString()}
                </td>

                <td className="px-5 py-4 max-w-sm truncate text-[var(--muted)]">
                  {o.itemName}
                </td>

                <td className="px-5 py-4 text-right font-bold text-green-400">
                  ₹{o.price}
                </td>

                <td
                  className="px-5 py-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <StatusSelect
                    value={o.status}
                    onChange={(v) =>
                      onUpdateStatus(o.orderId, v)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-3">
        {orders.map((o) => (
          <div
            key={o._id}
            onClick={() => setSelectedOrder(o)}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-2 cursor-pointer"
          >
            <div className="flex justify-between">
              <span className="font-semibold capitalize">
                {o.gameSlug}
              </span>
              <span className="text-xs text-[var(--muted)]">
                {new Date(o.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-[var(--muted)] line-clamp-2">
              {o.itemName}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-400">
                ₹{o.price}
              </span>

              <div onClick={(e) => e.stopPropagation()}>
                <StatusSelect
                  value={o.status}
                  onChange={(v) =>
                    onUpdateStatus(o.orderId, v)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DRAWER ================= */}
      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
}

/* ================= DRAWER ================= */

function OrderDrawer({ order, onClose, onUpdateStatus }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(order.orderId, newStatus);
    onClose(); // ✅ CLOSE MODAL AFTER CHANGE
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative ml-auto w-full max-w-md h-full bg-[var(--card)] border-l border-[var(--border)] shadow-2xl animate-slide-in">

        {/* ===== HEADER ===== */}
        <div className="px-6 py-5 border-b border-[var(--border)] relative space-y-3">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/10"
          >
            ✕
          </button>

          <p className="text-xs text-[var(--muted)]">
            Order Amount
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-green-400">
              ₹{order.price}
            </span>

            {/* STATUS IN HEADER */}
            <StatusSelect
              value={order.status}
              onChange={handleStatusChange}
            />
          </div>

          <p className="text-xs text-[var(--muted)] break-all">
            {order.orderId}
          </p>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-120px)] text-sm">
          <Section title="Game & Item">
            <Detail label="Game" value={order.gameSlug} />
            <Detail label="Item" value={order.itemName} />
            <Detail label="Slug" value={order.itemSlug} />
          </Section>

          <Section title="Player">
            <Detail label="Player ID" value={order.playerId} />
            <Detail label="Zone ID" value={order.zoneId} />
          </Section>

          <Section title="Payment">
            <Detail label="Method" value={order.paymentMethod} />
            <Detail label="Payment Status" value={order.paymentStatus} />
            <Detail label="Topup Status" value={order.topupStatus} />
          </Section>

          <Section title="User">
            <Detail label="Email" value={order.email || "—"} />
            <Detail label="Phone" value={order.phone || "—"} />
            <Detail
              label="Created"
              value={new Date(order.createdAt).toLocaleString()}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function StatusSelect({ value, onChange }) {
  const styles = {
    pending: "bg-yellow-500/15 border-yellow-500 text-yellow-400",
    success: "bg-green-500/15 border-green-500 text-green-400",
    failed: "bg-red-500/15 border-red-500 text-red-400",
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 px-3 rounded-lg text-xs font-semibold border ${styles[value]}`}
    >
      <option value="pending">PENDING</option>
      <option value="success">SUCCESS</option>
      <option value="failed">FAILED</option>
    </select>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-xs text-[var(--muted)]">{label}</span>
      <span className="font-medium break-words max-w-[60%] text-right">
        {value}
      </span>
    </div>
  );
}
