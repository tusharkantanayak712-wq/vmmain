"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

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

      {/* ===== Decorative background blobs ===== */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[var(--primary)]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      {/* ===== Card ===== */}
      <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[var(--card)]/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8">

        {/* ===== Brand ===== */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-purple-500 text-white font-bold text-xl shadow-lg">
            G
          </div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Sign in to continue to your account
          </p>
        </div>

        {/* ===== Feedback ===== */}
        {success && (
          <div className="mb-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400 text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        )}

        {/* ===== Google Button ===== */}
        <div className="flex justify-center">
          <div className={loading ? "pointer-events-none opacity-60" : ""}>
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

        {/* ===== Loading ===== */}
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--muted)] border-t-[var(--foreground)]" />
            Authenticating…
          </div>
        )}

        {/* ===== Footer ===== */}
        <p className="mt-6 text-center text-xs text-[var(--muted)] leading-relaxed">
          By continuing, you agree to our{" "}
          <span className="text-[var(--foreground)] hover:underline cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-[var(--foreground)] hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </section>
  );
}
