"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FiPlus, FiHome, FiGlobe, FiGrid, FiBarChart2, FiSettings, FiHelpCircle, FiCpu, FiAward, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/logo.png";

const ThemeToggle = dynamic(() => import("../ThemeToggle/ThemeToggle"), { ssr: false });


/* =====================================================
   HEADER CONFIG (SINGLE SOURCE OF TRUTH)
===================================================== */

const HEADER_CONFIG = {
  nav: [
    { label: "Home", href: "/", icon: <FiHome className="text-lg" /> },
    { label: "Region", href: "/region", icon: <FiGlobe className="text-lg" /> },
    { label: "Services", href: "/services", icon: <FiGrid className="text-lg" /> },
  ],

  userMenu: [
    { label: "Orders", href: "/dashboard", auth: true, icon: <FiBarChart2 /> },
    { label: "Customer Support", href: "/dashboard", auth: true, icon: <FiHelpCircle /> },
    // { label: "Account Settings", href: "/dashboard", auth: true, icon: <FiSettings /> },
    { label: "Leader Board", href: "/leaderboard", auth: true, icon: <FiAward /> },
    { label: "Membership", href: "/admin-panal", auth: true, icon: <FiCpu /> },
  ],

  roleMenu: {
    owner: [
      { label: "Admin Panel", href: "/owner-panal" },
    ],
  },
};

/* =====================================================
   COMPONENT
===================================================== */

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
        else localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "backdrop-blur-xl shadow-lg bg-[var(--card)]/90 border-b border-[var(--border)]"
        : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-14">

        {/* LOGO */}
        <Link href="/" className="flex items-center relative group">
          <Image src={logo} alt="Logo" width={55} height={17} priority />
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-[var(--accent)]"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-1">
          {HEADER_CONFIG.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg opacity-80 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {item.label}
                </span>
              </span>
              <motion.div
                className="absolute inset-0 bg-[var(--accent)]/10 rounded-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <ThemeToggle />

          {/* USER ICON */}
          <motion.button
            onClick={() => {
              if (user) {
                setUserMenuOpen((p) => !p);
              } else {
                router.push("/login");
              }
            }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center overflow-hidden shadow-lg relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            ) : (
              <FaUser className="text-white" />
            )}
            <motion.div
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* USER DROPDOWN */}
          <AnimatePresence>
            {userMenuOpen && !loading && (
              <motion.div
                className="absolute right-0 top-[3.8rem] w-72 bg-[var(--card)]/98 backdrop-blur-2xl border border-[var(--border)] rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-50 origin-[top_right]"
                initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(10px)" }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
              >
                {/* Top Subtle Border Glow */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
                <div className="p-3">
                  {!user ? (
                    <Link
                      href="/login"
                    >
                      Login / Register
                    </Link>
                  ) : (
                    <>
                      {/* PROFILE SECTION */}
                      <div className="flex items-center gap-3 px-1 pb-3">
                        <div className="relative group/avatar">
                          <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[var(--accent)]/20 shadow-lg bg-[var(--card)]">
                            {user.avatar ? (
                              <Image src={user.avatar} alt={user.name} width={44} height={44} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center">
                                <FaUser className="text-white text-base" />
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border border-[var(--card)] rounded-full shadow-lg" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-sm font-black text-[var(--foreground)] truncate tracking-tight lowercase first-letter:uppercase">
                            {user.name}
                          </h4>
                          <span className="text-[10px] text-[var(--muted)] truncate opacity-60">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {/* QUICK WALLET CARD */}
                      <Link href="/dashboard" className="block mb-4 relative group/wallet">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-purple-600 blur-xl opacity-0 group-hover/wallet:opacity-20 transition-opacity duration-500" />
                        <motion.div
                          className="relative flex justify-between items-center bg-gradient-to-br from-[var(--foreground)]/[0.03] to-transparent p-3 rounded-xl border border-[var(--border)] group-hover/wallet:border-[var(--accent)]/30 transition-all overflow-hidden"
                          whileHover={{ y: -1 }}
                        >
                          <div className="flex flex-col">
                            <span className="text-[8px] text-[var(--muted)] uppercase tracking-[0.2em] font-black opacity-30 mb-0.5">Balance</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-black text-[var(--foreground)] tracking-tighter">₹{user.wallet}</span>
                            </div>
                          </div>
                          <motion.div
                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shadow-[0_5px_15px_-5px_rgba(var(--accent-rgb),0.3)] text-white"
                            whileHover={{ scale: 1.05, rotate: 90 }}
                          >
                            <FiPlus size={16} />
                          </motion.div>
                        </motion.div>
                      </Link>

                      {/* DIVIDER */}
                      <div className="h-px bg-[var(--border)] my-3" />

                      {/* NAVIGATION LIST */}
                      <div className="space-y-1">
                        <h5 className="px-3 pb-2 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-30">Menu Navigation</h5>
                        {HEADER_CONFIG.userMenu.map(
                          (item) =>
                            item.auth && (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3.5 py-2.5 px-3 rounded-xl hover:bg-[var(--foreground)]/[0.03] text-[var(--muted)] hover:text-[var(--foreground)] transition-all text-sm font-bold group"
                              >
                                <span className="p-1.5 rounded-lg bg-[var(--foreground)]/[0.03] text-[var(--muted)]/60 group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)] transition-all">
                                  {item.icon}
                                </span>
                                {item.label}
                                <FiPlus className="ml-auto opacity-0 group-hover:opacity-20 transition-opacity" size={10} />
                              </Link>
                            )
                        )}

                        {/* PRIVILEGED ACCESS */}
                        {HEADER_CONFIG.roleMenu[user.userType]?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="mt-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 text-indigo-500 hover:from-indigo-500/20 hover:to-purple-600/20 transition-all shadow-sm group"
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-lg bg-indigo-500 text-white">
                                <FiCpu size={12} />
                              </div>
                              <span className="text-xs font-black uppercase tracking-tight italic">{item.label}</span>
                            </div>
                            <FiPlus className="rotate-45 opacity-40 group-hover:rotate-0 transition-transform duration-500" size={14} />
                          </Link>
                        ))}
                      </div>

                      {/* DIVIDER */}
                      <div className="h-px bg-[var(--border)] my-3" />

                      <motion.button
                        onClick={handleLogout}
                        className="w-full mt-4 py-2.5 px-4 rounded-xl bg-red-500/[0.06] text-red-500 hover:bg-red-500 hover:text-white hover:shadow-[0_5px_15px_-5px_rgba(239,68,68,0.3)] transition-all text-[10px] font-black uppercase tracking-[0.2em] relative overflow-hidden group/logout"
                        whileHover={{ y: -1 }}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2 transition-colors uppercase">
                          <span>Secure Logout</span>
                          <FiLogOut size={14} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover/logout:opacity-100 transition-opacity" />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.header>
  );
}
