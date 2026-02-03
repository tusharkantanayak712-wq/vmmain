"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus, FiMenu, FiX, FiHome, FiGlobe, FiGrid, FiBarChart2, FiSettings, FiHelpCircle, FiCpu, FiAward } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/logo.png";

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
    { label: "Dashboard", href: "/dashboard", auth: true, icon: <FiBarChart2 /> },
    { label: "Customer Support", href: "/dashboard", auth: true, icon: <FiHelpCircle /> },
    { label: "Account Settings", href: "/dashboard", auth: true, icon: <FiSettings /> },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = sessionStorage.getItem("token");
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
        else sessionStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">

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
                className="absolute right-0 top-14 w-64 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4">
                  {!user ? (
                    <Link
                      href="/login"
                    >
                      Login / Register
                    </Link>
                  ) : (
                    <>
                      {/* WALLET */}
                      <Link href="/dashboard">
                        <motion.div
                          className="flex justify-between items-center bg-gradient-to-r from-[var(--accent)]/10 to-purple-500/10 px-4 py-3 rounded-xl border border-[var(--accent)]/30 mb-3"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-[var(--accent)] font-bold text-lg">
                            ₹{user.wallet}
                          </span>
                          <motion.div
                            className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiPlus className="text-white" size={16} />
                          </motion.div>
                        </motion.div>
                      </Link>

                      {/* DIVIDER */}
                      <div className="h-px bg-[var(--border)] my-3" />

                      {/* USER MENU */}
                      <div className="space-y-1">
                        {HEADER_CONFIG.userMenu.map(
                          (item) =>
                            item.auth && (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-[var(--background)] hover:text-[var(--accent)] transition-all text-sm group"
                              >
                                <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                                  {item.icon}
                                </span>
                                <span className="font-medium">{item.label}</span>
                              </Link>
                            )
                        )}

                        {/* ROLE MENU */}
                        {HEADER_CONFIG.roleMenu[user.userType]?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block py-2 px-3 rounded-lg hover:bg-[var(--background)] hover:text-[var(--accent)] transition-all text-sm font-semibold"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* DIVIDER */}
                      <div className="h-px bg-[var(--border)] my-3" />

                      <motion.button
                        onClick={handleLogout}
                        className="w-full text-center py-2 px-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Logout
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MOBILE TOGGLE */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--background)] transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-[var(--card)] border-t border-[var(--border)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col px-6 py-4 space-y-2">
              {HEADER_CONFIG.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-[var(--background)] hover:text-[var(--accent)] transition-all group"
                  >
                    <span className="text-xl text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                      {item.icon}
                    </span>
                    <span className="font-bold tracking-wide">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
