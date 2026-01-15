"use client";

import { useState, useEffect } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import OrderItem from "../../components/Dashboard/OrderItem";
import WalletTab from "../../components/Dashboard/WalletTab";
import AccountTab from "../../components/Dashboard/AccountTab";
import QueryTab from "../../components/Dashboard/QueryTab";

type OrderType = {
  orderId: string;
  gameSlug: string;
  itemSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  createdAt: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  /* ================= SEARCH + PAGINATION ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (!token) return;

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;

        setUserDetails({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        });

        setWalletBalance(data.user.wallet || 0);
        setTotalOrders(data.user.order || 0);
      });
  }, [token]);

  /* ================= LOAD ORDERS ================= */
  useEffect(() => {
    if (!token || activeTab !== "orders") return;

    fetch("/api/order/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        limit,
        search,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders || []);
        }
      });
  }, [token, page, search, activeTab]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const tabCards = [
    { key: "orders", label: "Total Orders", value: totalOrders },
    { key: "wallet", label: "Wallet Balance", value: `₹${walletBalance}` },
    { key: "account", label: "Account", value: "Manage" },
    { key: "query", label: "Support", value: "Help" },
  ];

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-8">

        {/* ================= HEADER ================= */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl font-bold">
            Welcome{userDetails.name && `, ${userDetails.name}`}
          </h1>
          <p className="text-[var(--muted)] mt-1">
            Manage your orders, wallet, and account
          </p>
        </div>

        {/* ================= TOP STATS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {tabCards.map((tab) => (
            <DashboardCard
              key={tab.key}
              tab={tab}
              activeTab={activeTab}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </div>

        {/* ================= MAIN PANEL ================= */}
        <div className="max-w-4xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6">

          {/* ================= ORDERS ================= */}
          {activeTab === "orders" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-semibold">
                  Order History
                </h2>

                <div className="relative w-full sm:w-72">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by game or item"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border
                    border-[var(--border)] bg-[var(--background)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-14">
                  <p className="text-lg font-medium">
                    No orders found
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    Your completed orders will appear here
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <OrderItem
                        key={order.orderId}
                        order={order}
                      />
                    ))}
                  </div>

                  {/* PAGINATION */}
                  <div className="mt-8 flex justify-between items-center">
                    <button
                      disabled={page === 1}
                      onClick={() =>
                        setPage((p) => Math.max(1, p - 1))
                      }
                      className="w-11 h-11 flex items-center justify-center rounded-xl border
                      disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft size={22} />
                    </button>

                    <span className="text-sm text-[var(--muted)]">
                      Page {page}
                    </span>

                    <button
                      disabled={orders.length < limit}
                      onClick={() => setPage((p) => p + 1)}
                      className="w-11 h-11 flex items-center justify-center rounded-xl border
                      disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight size={22} />
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ================= WALLET ================= */}
          {activeTab === "wallet" && (
            <WalletTab
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
          )}

          {/* ================= ACCOUNT ================= */}
          {activeTab === "account" && (
            <AccountTab userDetails={userDetails} />
          )}

          {/* ================= SUPPORT ================= */}
          {activeTab === "query" && <QueryTab />}
        </div>
      </section>
    </AuthGuard>
  );
}
