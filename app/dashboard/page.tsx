"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLayout, FiClock, FiSettings, FiCreditCard, FiHelpCircle, FiChevronRight } from "react-icons/fi";

import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import WalletTab from "../../components/Dashboard/WalletTab";
import AccountTab from "../../components/Dashboard/AccountTab";
import QueryTab from "../../components/Dashboard/QueryTab";
import OrdersTab from "../../components/Dashboard/OrdersTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [walletBalance, setWalletBalance] = useState(0);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

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
      });
  }, [token]);

  const tabCards = [
    { key: "orders", label: "Orders", value: "View" },
    // { key: "wallet", label: "Wallet", value: `₹${walletBalance}` },
    // { key: "account", label: "Profile", value: "Manage" },
    { key: "query", label: "Support", value: "Help" },
  ];

  return (
    <AuthGuard>
      <section className="min-h-screen px-4 sm:px-6 py-12 bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
        {/* Subtle Decorative Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md">
                  User Dashboard
                </span>
                <div className="h-[1px] w-8 bg-[var(--accent)]/30" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Welcome, <span className="text-[var(--accent)]">{userDetails.name.split(' ')[0] || "Player"}</span>
              </h1>
              <p className="text-sm text-[var(--muted)] font-medium max-w-md">
                Manage your gaming assets, track current orders, and secure your account from your central command.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[var(--card)]/50 backdrop-blur-md border border-[var(--border)] p-1.5 rounded-2xl pr-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-[var(--accent)]/20">
                {userDetails.name?.charAt(0) || "U"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-[var(--foreground)]">{userDetails.name || "Loading..."}</span>
                <span className="text-[10px] font-bold text-[var(--muted)] opacity-60 uppercase tracking-wider">{userDetails.email}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* SIDEBAR NAVIGATION (CARDS) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4"
            >
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {tabCards.map((tab, idx) => (
                  <DashboardCard
                    key={tab.key}
                    tab={tab}
                    activeTab={activeTab}
                    onClick={() => setActiveTab(tab.key)}
                  />
                ))}
              </div>

              {/* Quick Summary / Status Card */}
              <div className="mt-6 p-6 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--background)] hidden lg:block">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-4">Account Status</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--muted)]">Wallet Balance</span>
                    <span className="text-sm font-black text-[var(--foreground)]">₹{walletBalance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--muted)]">Active Orders</span>
                    <span className="text-sm font-black text-green-500">None</span>
                  </div>
                  <div className="h-[1px] bg-[var(--border)] w-full" />
                  <button className="w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Quick Top Up
                  </button>
                </div>
              </div>
            </motion.div>

            {/* MAIN CONTENT AREA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="bg-[var(--card)]/60 backdrop-blur-xl border border-[var(--border)] rounded-[2rem] overflow-hidden shadow-2xl relative">
                {/* Header of Content Area */}
                <div className="px-6 py-5 border-b border-[var(--border)]/50 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                      {activeTab === 'orders' && <FiClock />}
                      {activeTab === 'wallet' && <FiCreditCard />}
                      {activeTab === 'account' && <FiSettings />}
                      {activeTab === 'query' && <FiHelpCircle />}
                    </div>
                    <h3 className="font-black text-sm uppercase tracking-widest text-[var(--foreground)]">
                      {activeTab} Management
                    </h3>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/20" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                    <div className="w-2 h-2 rounded-full bg-green-500/20" />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "orders" && <OrdersTab />}
                      {activeTab === "wallet" && (
                        <WalletTab
                          walletBalance={walletBalance}
                          setWalletBalance={setWalletBalance}
                        />
                      )}
                      {activeTab === "account" && (
                        <AccountTab userDetails={userDetails} />
                      )}
                      {activeTab === "query" && <QueryTab />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </AuthGuard>
  );
}

