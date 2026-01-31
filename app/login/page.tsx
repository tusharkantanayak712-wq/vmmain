"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[var(--background)] px-4 overflow-hidden">

      {/* SUBTLE BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-purple-500/5" />

      {/* MAIN CARD */}
      <motion.div
        className="relative w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-2xl p-8 sm:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >

        {/* BRAND SECTION */}
        <div className="text-center mb-8">
          {/* LOGO */}
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[var(--accent)] to-purple-500 rounded-2xl shadow-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Welcome Back
          </h1>
          <p className="text-[var(--muted)] text-sm">
            Sign in to continue your gaming journey
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <motion.div
            className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{success}</span>
          </motion.div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <motion.div
            className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}

        {/* GOOGLE LOGIN BUTTON */}
        <div className="flex justify-center mb-6">
          <div className={loading ? "pointer-events-none opacity-50" : ""}>
            <GoogleLogin
              onSuccess={(res) =>
                res.credential && handleGoogleLogin(res.credential)
              }
              onError={() =>
                setError("Google authentication was cancelled")
              }
              theme="outline"
              size="large"
              shape="pill"
            />
          </div>
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
          <motion.div
            className="flex flex-col items-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-8 h-8 border-3 border-[var(--muted)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
            <span className="text-xs text-[var(--muted)]">Authenticating...</span>
          </motion.div>
        )}

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--muted)] uppercase tracking-wider">Secure</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Secure" },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Fast" },
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Safe" }
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[var(--border)] bg-[var(--background)]"
            >
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
              <span className="text-xs text-[var(--muted)] font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-[var(--muted)] leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-[var(--accent)] hover:underline font-medium">
            Terms
          </a>
          {" "}&{" "}
          <a href="/privacy" className="text-[var(--accent)] hover:underline font-medium">
            Privacy
          </a>
        </p>
      </motion.div>
    </section>
  );
}
