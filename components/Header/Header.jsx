"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/logo.png";

/* =====================================================
   HEADER CONFIG (SINGLE SOURCE OF TRUTH)
===================================================== */

const HEADER_CONFIG = {
  nav: [
    { label: "Home", href: "/" },
    { label: "Region", href: "/region" },
    { label: "Services", href: "/services" },
  ],

  userMenu: [
    { label: "Dashboard", href: "/dashboard", auth: true },
    { label: "Customer Support", href: "/dashboard", auth: true },
    { label: "Account Settings", href: "/dashboard", auth: true },
    { label: "Leader Board", href: "/leaderboard", auth: true },
    { label: "Membership", href: "/admin-panal", auth: true },
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md shadow-md bg-[var(--card)]/80 border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-1 h-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" width={90} height={28} priority />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-6 text-[var(--muted)]">
          {HEADER_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <ThemeToggle />

          {/* USER ICON */}
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold"
          >
            {user ? user.name?.charAt(0)?.toUpperCase() : <FaUser />}
          </button>

          {/* USER DROPDOWN */}
          {userMenuOpen && !loading && (
            <div className="absolute right-0 top-14 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-4 z-50">

              {!user ? (
                <Link href="/login" className="block py-2 hover:text-[var(--accent)]">
                  Login / Register
                </Link>
              ) : (
                <>
                  {/* WALLET */}
                  <Link href="/dashboard">
                    <div className="flex justify-between bg-[var(--background)] px-3 py-2 rounded-lg border mb-3">
                      <span className="text-[var(--accent)] font-semibold">
                        ₹{user.wallet}
                      </span>
                      <FiPlus size={18} />
                    </div>
                  </Link>

                  {/* USER MENU */}
                  {HEADER_CONFIG.userMenu.map(
                    (item) =>
                      item.auth && (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-2 hover:text-[var(--accent)]"
                        >
                          {item.label}
                        </Link>
                      )
                  )}

                  {/* ROLE MENU */}
                  {HEADER_CONFIG.roleMenu[user.userType]?.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-2 hover:text-[var(--accent)]"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-red-500 hover:text-red-400"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[300px]" : "max-h-0"
        } bg-[var(--card)] border-t`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4 text-[var(--muted)]">
          {HEADER_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
