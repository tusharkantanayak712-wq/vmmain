"use client";

import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaWhatsapp,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";
import Link from "next/link";

export default function TopupComplete() {
  const [status, setStatus] = useState("checking"); // checking | success | failed
  const [message, setMessage] = useState("Verifying payment...");

  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);

  useEffect(() => {
    const orderId = localStorage.getItem("pending_topup_order");
    setPendingOrderId(orderId);

    if (!orderId) {
      setStatus("failed");
      setMessage("Order not found");
      return;
    }

    async function verify() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/order/verify-topup-payment", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        if (data?.success) {
          setStatus("success");
          setMessage("Payment successful!");

          // Optional cleanup
          localStorage.removeItem("pending_topup_order");
        } else {
          setStatus("failed");
          setMessage("Payment failed or still pending");
        }
      } catch (err) {
        console.error("Topup verification error:", err);
        setStatus("failed");
        setMessage("Unable to verify payment");
      }
    }

    verify();
  }, []);

  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP || "9229331866";
  const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER.replace(/\D/g, "")}`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl p-8 text-center">

          {/* ICON SECTION */}
          <div className="flex justify-center mb-6">
            {status === "checking" && (
              <FaSpinner className="text-5xl animate-spin text-[var(--accent)]" />
            )}
            {status === "success" && (
              <FaCheckCircle className="text-6xl text-green-500" />
            )}
            {status === "failed" && (
              <FaTimesCircle className="text-6xl text-red-500" />
            )}
          </div>

          {/* MESSAGE CONTENT */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {message}
            </h1>

            <div className="text-sm text-[var(--muted)] leading-relaxed">
              {status === "checking" && (
                <p>Verifying your transaction. Please do not refresh the page.</p>
              )}

              {status === "success" && (
                <p>Your payment was successful! Diamonds will be credited to your account shortly.</p>
              )}

              {status === "failed" && (
                <div className="mt-4 p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-[var(--foreground)]">
                  <p className="font-semibold text-red-500 mb-1 text-base">Payment Issue?</p>
                  <p className="mb-2">
                    If money was deducted, diamonds will be sent automatically or a refund will be processed.
                  </p>
                  <p className="font-medium">Please contact support for help.</p>
                </div>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 space-y-3">
            {status === "failed" && (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] py-3.5 font-bold !text-white hover:opacity-90 transition-all"
              >
                <FaWhatsapp className="text-lg" />
                Contact Support
              </a>
            )}

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[var(--accent)] py-3.5 font-bold !text-white hover:opacity-90 transition-all"
            >
              <FaHome className="text-lg" />
              Go to Home
            </Link>
          </div>

          {/* FOOTER INFO */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] text-[var(--muted)] text-xs">
            Transaction ID: {pendingOrderId || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
