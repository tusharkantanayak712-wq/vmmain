"use client";

import { JSX, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

interface AccountTabProps {
  userDetails: UserDetails;
}

export default function AccountTab({ userDetails }: AccountTabProps) {
  const [newPass, setNewPass] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPass.length < 6) {
      setPassError("Minimum 6 characters required");
      return;
    }

    setLoadingPass(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: userDetails.email || userDetails.phone,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      setLoadingPass(false);

      if (!data.success) {
        setPassError(data.message);
        return;
      }

      setNewPass("");
      setPassSuccess("Password updated successfully");
      setTimeout(() => setPassSuccess(""), 2500);
    } catch {
      setLoadingPass(false);
      setPassError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Account Settings
        </h2>
        <p className="text-[var(--muted)] text-sm sm:text-base mt-1">
          Manage your personal information and security
        </p>
      </div>

      {/* ================= USER INFO ================= */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h3 className="text-lg font-semibold mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InfoRow icon={<FaUser />} label="Name" value={userDetails.name} />
          <InfoRow icon={<FaEnvelope />} label="Email" value={userDetails.email} />
          <InfoRow icon={<FaPhone />} label="Phone" value={userDetails.phone} />
        </div>
      </section>

      {/* ================= PASSWORD SECTION ================= */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaLock className="text-[var(--accent)]" />
          <h3 className="text-lg sm:text-xl font-semibold">
            Security
          </h3>
        </div>

        {/* Status */}
        {passSuccess && (
          <div className="mb-4 rounded-xl bg-green-500/10 text-green-500 px-4 py-2 text-sm">
            {passSuccess}
          </div>
        )}
        {passError && (
          <div className="mb-4 rounded-xl bg-red-500/10 text-red-500 px-4 py-2 text-sm">
            {passError}
          </div>
        )}

        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm font-medium block mb-1">
              New Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
                setPassError("");
              }}
              className="
                w-full p-4 rounded-xl
                border border-[var(--border)]
                bg-transparent
                focus:outline-none
                focus:ring-2 focus:ring-[var(--accent)]
                transition
              "
            />

            <p className="text-xs text-[var(--muted)] mt-1">
              Use at least 6 characters for better security
            </p>
          </div>

          <button
            disabled={loadingPass}
            onClick={handlePasswordUpdate}
            className="
              w-full sm:w-auto min-w-[220px]
              py-3 rounded-xl
              text-white font-medium
              bg-[var(--accent)]
              transition
              hover:opacity-90
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loadingPass ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

/* ================= INFO ROW ================= */

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: JSX.Element;
}) {
  return (
    <div
      className="
        flex items-center gap-4
        rounded-xl border border-[var(--border)]
        p-4 bg-[var(--background)]
      "
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--accent)]/10 text-[var(--accent)]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)]">{label}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
