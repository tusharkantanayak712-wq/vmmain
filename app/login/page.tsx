"use client";

import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleLogin = async (credential: string) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credential }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Authentication failed");
        return;
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userName", data.user.name);
      sessionStorage.setItem("email", data.user.email);
      sessionStorage.setItem("userId", data.user.userId);

      setSuccess("Signed in successfully. Redirecting...");
      setTimeout(() => (window.location.href = "/"), 900);
    } catch {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Hydration fix helper
  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--background)] px-4 overflow-hidden">

      {/* ================= BACKGROUND EFFECTS ================= */}

      {/* 1. Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[var(--accent)]/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      {/* 2. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* 3. Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[var(--accent)]/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* ================= MAIN CARD ================= */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glassmorphism Card */}
        <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xl shadow-2xl p-8 sm:p-12 overflow-hidden">

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />

          {/* BRAND LOGO CONTEXT */}
          <div className="text-center mb-10 relative z-10">
            <div className="relative inline-flex items-center justify-center mb-6 group">
              {/* Rotating Glow */}
              <div className="absolute -inset-4 bg-[conic-gradient(from_0deg,#3b82f6,#a855f7,#3b82f6)] rounded-full opacity-40 blur-xl animate-spin-slow transition-opacity duration-500 group-hover:opacity-70" />

              {/* Logo Container */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-[var(--accent)] to-purple-600 rounded-2xl shadow-inner flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 border border-white/10">
                <Image
                  src="/logo.png"
                  alt="Vamp Logo"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain drop-shadow-md brightness-0 invert"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-[var(--muted)] text-sm font-medium">
                Sign in to continue your gaming journey
              </p>
            </motion.div>
          </div>

          {/* ALERTS */}
          <AnimatePresence mode="wait">
            {success && (
              <motion.div
                key="success"
                className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 font-medium"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 font-medium"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GOOGLE BUTTON WRAPPER */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`relative group w-full flex justify-center ${loading ? "pointer-events-none opacity-50 grayscale" : ""}`}>
              {/* Animated Gradient Border using pseudo-element approximation div */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500 animate-gradient-x" />

              <div className="relative w-full flex justify-center">
                <GoogleLogin
                  onSuccess={(res) =>
                    res.credential && handleGoogleLogin(res.credential)
                  }
                  onError={() =>
                    setError("Google authentication was cancelled")
                  }
                  theme="filled_black"
                  size="large"
                  shape="pill"
                  width="100%"
                />
              </div>
            </div>
          </motion.div>

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              className="flex flex-col items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 border-4 border-t-[var(--accent)] border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-[var(--accent)] border-l-transparent rounded-full animate-spin-slow reverse" />
              </div>
              <span className="text-xs text-[var(--muted)] font-medium tracking-wide animate-pulse">Authenticating Securely...</span>
            </motion.div>
          )}

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8 opacity-60">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
            <span className="text-[10px] text-[var(--muted)] uppercase tracking-[0.2em] font-bold">Trusted By Gamers</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Encrypted" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Instant" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Verified" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]/50 hover:bg-[var(--card)] hover:border-[var(--accent)]/30 transition-all group cursor-default"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="p-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <span className="text-[10px] text-[var(--muted)] font-bold uppercase tracking-wide">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          {/* FOOTER */}
          <motion.p
            className="text-center text-xs text-[var(--muted)] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            By continuing, you acknowledge our{" "}
            <a href="/terms" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline font-medium transition-colors">
              Terms
            </a>
            {" "}&{" "}
            <a href="/privacy" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline font-medium transition-colors">
              Privacy Policy
            </a>
          </motion.p>

        </div>
      </motion.div>
    </section>
  );
}
