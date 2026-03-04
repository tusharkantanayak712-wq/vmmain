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

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--background)] px-4 overflow-hidden">

      {/* ================= SOFT AMBIANCE ================= */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="relative w-full max-w-[380px] z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] p-8 sm:p-10 text-center">

          {/* BRANDING */}
          <div className="mb-8">
            <motion.div
              className="inline-block p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--border)] shadow-sm mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </motion.div>

            <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-[var(--muted)] text-xs leading-relaxed max-w-[220px] mx-auto font-medium">
              Join thousands of gamers managing their top-ups effortlessly
            </p>
          </div>

          {/* NOTIFICATIONS */}
          <AnimatePresence mode="wait">
            {(success || error) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`mb-6 p-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-3 ${success ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-red-500/10 text-red-600 border border-red-500/20"
                  }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${success ? "bg-green-500" : "bg-red-500"}`} />
                {success || error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAIN ACTION */}
          <div className={`space-y-5 transition-all duration-300 ${loading ? "opacity-40 grayscale pointer-events-none" : ""}`}>
            <div className="relative flex justify-center scale-95 origin-center">
              <GoogleLogin
                onSuccess={(res) => res.credential && handleGoogleLogin(res.credential)}
                onError={() => setError("Authentication was interrupted")}
                theme="outline"
                size="large"
                shape="pill"
                width="300"
              />
            </div>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest px-2">Secure Access</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
          </div>

          {/* LOADING STATE - Minimalist */}
          {loading && (
            <motion.div
              className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-3.5 h-3.5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              Verifying...
            </motion.div>
          )}

          {/* VALUE PROPS - Elegant icons */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-8 opacity-70">
            {[
              { label: "Secure", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
              { label: "Instant", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { label: "Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" }
            ].map((prop, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={prop.icon} />
                </svg>
                <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-tight">{prop.label}</span>
              </div>
            ))}
          </div>

          {/* LEGAL */}
          <div className="mt-8 pt-2">
            <p className="text-[10px] text-[var(--muted)] leading-relaxed font-medium">
              By signing in, you agree to our <br />
              <a href="/terms" className="text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">Terms</a> & <a href="/privacy" className="text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">Privacy</a>
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
