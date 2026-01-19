"use client";

import { useEffect, useState } from "react";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import AuthGuard from "@/components/AuthGuard";
import UsersTab from "@/components/admin/UsersTab";
import OrdersTab from "@/components/admin/OrdersTab";
import PricingTab from "@/components/admin/PricingTab";
import TransactionsTab from "@/components/admin/TransactionsTab";
import SupportQueriesTab from "@/components/admin/SupportQueriesTab";
import BannersTab from "@/components/admin/BannersTab";


export default function AdminPanalPage() {
  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [queries, setQueries] = useState([]);

  const [balance, setBalance] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [banners, setBanners] = useState([]);


  /* ================= TABLE CONTROLS ================= */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  /* ================= PRICING STATE ================= */
  const [pricingType, setPricingType] = useState("admin");
  const [slabs, setSlabs] = useState([{ min: 0, max: 100, percent: 0 }]);
  const [overrides, setOverrides] = useState([]);
  const [savingPricing, setSavingPricing] = useState(false);

  /* ================= HELPERS ================= */
  const normalizeSlabs = (list) =>
    [...list].sort((a, b) => a.min - b.min);

  const resetControls = () => {
    setSearch("");
    setPage(1);
  };

  const currentData =
    activeTab === "users"
      ? users
      : activeTab === "orders"
      ? orders
      : activeTab === "transactions"
      ? transactions
      : activeTab === "queries"
      ? queries
      : [];

  /* ================= FETCH BALANCE ================= */
  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/game/balance");
      const data = await res.json();
      if (data.success) {
        setBalance(data?.balance?.data?.balance ?? data.balance);
      }
    } catch (err) {
      console.error("Balance fetch failed", err);
    }
  };

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `/api/admin/users?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setUsers(data.data || []);
  };
  const fetchBanners = async () => {
  const token = sessionStorage.getItem("token");
  const res = await fetch("/api/admin/banners/game-banners", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  setBanners(data.data || []);
};


  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `/api/admin/orders?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setOrders(data.data || []);
  };

  /* ================= FETCH TRANSACTIONS ================= */
  const fetchTransactions = async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `/api/admin/transactions?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setTransactions(data.data || []);
  };

  /* ================= FETCH SUPPORT QUERIES ================= */
  const fetchQueries = async () => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `/api/admin/support-queries?page=${page}&limit=${limit}&search=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setQueries(data.data || []);
  };

  /* ================= CHANGE USER ROLE ================= */
  const changeUserRole = async (userId, newUserType) => {
    try {
      setUpdatingUserId(userId);
      const token = sessionStorage.getItem("token");

      const res = await fetch("/api/admin/users/change-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, newUserType }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed");
      }

      fetchUsers();
    } finally {
      setUpdatingUserId(null);
    }
  };

  /* ================= FETCH PRICING ================= */
  const fetchPricing = async (type) => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`/api/admin/pricing?userType=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data.success) {
      setSlabs(
        data.data?.slabs?.length
          ? data.data.slabs
          : [{ min: 0, max: 0, percent: 0 }]
      );
      setOverrides(data.data?.overrides || []);
    }
  };

  /* ================= SAVE PRICING ================= */
  const savePricing = async () => {
    try {
      setSavingPricing(true);
      const token = sessionStorage.getItem("token");

      const res = await fetch("/api/admin/pricing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userType: pricingType,
          slabs: normalizeSlabs(slabs),
          overrides,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed");
      } else {
        alert("Pricing updated successfully");
      }
    } finally {
      setSavingPricing(false);
    }
  };

  /* ================= UPDATE ORDER STATUS ================= */
  const updateOrderStatus = async (orderId, status) => {
    const token = sessionStorage.getItem("token");
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId, status }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Failed to update order");
      return;
    }

    fetchOrders();
  };

  /* ================= UPDATE QUERY STATUS ================= */
  const updateQueryStatus = async (id, status) => {
    const token = sessionStorage.getItem("token");
    const res = await fetch("/api/admin/support-queries/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, status }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Failed to update status");
      return;
    }

    fetchQueries();
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    resetControls();
  }, [activeTab]);
  useEffect(() => {
  if (activeTab === "banners") fetchBanners();
}, [activeTab]);


  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "transactions") fetchTransactions();
    if (activeTab === "queries") fetchQueries();
    if (activeTab === "pricing") fetchPricing(pricingType);
  }, [activeTab, pricingType, page, search]);

  return (
    <AuthGuard>
      <section className="min-h-screen bg-[var(--background)] px-6 py-3">
        <div className="max-w-6xl mx-auto">
{/* HEADER */}
<div className="mb-4">
  <div className="flex items-center gap-2">
    <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
      Admin Panel
    </h1>

    {/* Accent status dot */}
    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
  </div>

  <p className="mt-0.5 text-xs md:text-sm text-[var(--muted)] max-w-lg leading-snug">
    Manage users, orders, transactions, queries & pricing
  </p>
</div>


{/* BALANCE */}
<div className="
  mb-6
  relative
  rounded-xl
  border border-[var(--border)]
  bg-[var(--card)]
  px-5 py-4
">

  {/* Top accent bar */}
  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-500 rounded-t-xl" />

  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
    Account Balance
  </p>

  <div className="mt-1 flex items-end gap-2">
    <p className="text-2xl font-bold text-[var(--foreground)]">
      {balance !== null ? balance : "Loading…"}
    </p>

    <span className="text-sm font-medium text-green-500">
      Available
    </span>
  </div>
</div>


    {/* TABS */}
<div className="mb-5 flex flex-wrap gap-2">
  {["users", "orders", "transactions", "queries", "pricing", "banners"].map(
    (tab) => {
      const isActive = activeTab === tab;

      return (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            relative
            px-3.5 py-1.5
            rounded-lg
            text-xs sm:text-sm
            font-semibold
            border
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40
            ${
              isActive
                ? `
                  bg-[var(--accent)]/15
                  text-[var(--accent)]
                  border-[var(--accent)]/40
                `
                : `
                  bg-[var(--card)]
                  text-[var(--muted)]
                  border-[var(--border)]
                  hover:text-[var(--foreground)]
                  hover:border-[var(--accent)]/30
                `
            }
          `}
        >
          {tab.toUpperCase()}

          {/* Active underline */}
          {isActive && (
            <span className="
              absolute left-1/2 -bottom-1
              h-0.5 w-6
              -translate-x-1/2
              rounded-full
              bg-gradient-to-r
              from-[var(--accent)]
              to-purple-500
            " />
          )}
        </button>
      );
    }
  )}
</div>

       {/* SEARCH */}
{["users", "orders", "transactions", "queries"].includes(activeTab) && (
  <div className="mb-4 relative max-w-md">
    <FiSearch
      className="
        absolute left-3 top-1/2 -translate-y-1/2
        text-[var(--muted)]
        pointer-events-none
      "
    />

    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      placeholder={`Search ${activeTab}…`}
      className="
        w-full
        h-9
        pl-9 pr-3
        rounded-lg
        border border-[var(--border)]
        bg-[var(--card)]
        text-sm
        placeholder:text-[var(--muted)]
        transition
        hover:border-[var(--accent)]/30
        focus:outline-none
        focus:ring-2
        focus:ring-[var(--accent)]/30
        focus:border-[var(--accent)]
      "
    />
  </div>
)}


          {/* PANEL */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            {activeTab === "users" && (
              <UsersTab
                users={users}
                updatingUserId={updatingUserId}
                onChangeRole={changeUserRole}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                onUpdateStatus={updateOrderStatus}
              />
            )}

            {activeTab === "transactions" && (
              <TransactionsTab transactions={transactions} />
            )}

            {activeTab === "queries" && (
              <SupportQueriesTab
                queries={queries}
                onUpdateStatus={updateQueryStatus}
              />
            )}
            {activeTab === "banners" && (
  <BannersTab banners={banners} onRefresh={fetchBanners} />
)}


            {activeTab === "pricing" && (
              <PricingTab
                pricingType={pricingType}
                setPricingType={setPricingType}
                slabs={slabs}
                setSlabs={setSlabs}
                overrides={overrides}
                setOverrides={setOverrides}
                savingPricing={savingPricing}
                onSave={savePricing}
              />
            )}
          </div>

          {/* PAGINATION */}
          {currentData.length > 0 &&
            ["users", "orders", "transactions", "queries"].includes(
              activeTab
            ) && (
              <div className="mt-4 flex justify-between items-center">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg border disabled:opacity-40"
                >
                  <FiChevronLeft size={20} />
                </button>

                <span className="text-sm text-[var(--muted)]">
                  Page {page}
                </span>

                <button
                  disabled={currentData.length < limit}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 rounded-lg border disabled:opacity-40"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
        </div>
      </section>
    </AuthGuard>
  );
}
