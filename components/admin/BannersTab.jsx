"use client";

import { useState } from "react";

export default function BannersTab({ banners, onRefresh }) {
  const [form, setForm] = useState({
    bannerImage: "",
    bannerTitle: "",
    bannerSlug: "",
    bannerLink: "",
    bannerSummary: "",
    gameId: "",
    isShow: true,
  });

  const [editingId, setEditingId] = useState(null);

  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token")
      : null;

  /* ================= ADD / UPDATE ================= */

  const addBanner = async () => {
    if (!form.bannerImage || !form.bannerTitle || !form.bannerSlug) {
      alert("Image URL, Title & Slug are required");
      return;
    }

    const res = await fetch("/api/admin/banners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        gameId: form.gameId
          ? form.gameId.split(",").map((g) => g.trim())
          : [],
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Failed to add banner");
      return;
    }

    resetForm();
    onRefresh();
  };

  const startEdit = (b) => {
    setEditingId(b._id);
    setForm({
      bannerImage: b.bannerImage || "",
      bannerTitle: b.bannerTitle || "",
      bannerSlug: b.bannerSlug || "",
      bannerLink: b.bannerLink || "",
      bannerSummary: b.bannerSummary || "",
      gameId: b.gameId?.join(", ") || "",
      isShow: b.isShow ?? true,
    });
  };

  const updateBanner = async () => {
    if (!form.bannerSlug) {
      alert("Banner slug is required");
      return;
    }

    const res = await fetch("/api/admin/banners/editbanner", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        gameId: form.gameId
          ? form.gameId.split(",").map((g) => g.trim())
          : [],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Failed to update banner");
      return;
    }

    resetForm();
    onRefresh();
  };

  const toggleShow = async (id, isShow) => {
    await fetch(`/api/admin/banners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isShow: !isShow }),
    });

    onRefresh();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      bannerImage: "",
      bannerTitle: "",
      bannerSlug: "",
      bannerLink: "",
      bannerSummary: "",
      gameId: "",
      isShow: true,
    });
  };

  return (
    <div className="space-y-8">

      {/* ================= FORM ================= */}
      <div
        className={`
          rounded-xl border bg-[var(--card)]
          ${editingId ? "border-[var(--accent)]" : "border-[var(--border)]"}
        `}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-base font-bold">
            {editingId ? "Edit Banner" : "Add New Banner"}
          </h3>
          <p className="text-xs text-[var(--muted)]">
            Banner metadata & visibility settings
          </p>
        </div>

        {/* Body */}
        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT – FORM */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="label">Banner Image URL</label>
              <input
                value={form.bannerImage}
                onChange={(e) =>
                  setForm({ ...form, bannerImage: e.target.value })
                }
                className="input"
                placeholder="https://example.com/banner.jpg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Banner Title</label>
                <input
                  value={form.bannerTitle}
                  onChange={(e) =>
                    setForm({ ...form, bannerTitle: e.target.value })
                  }
                  className="input"
                />
              </div>

              <div>
                <label className="label">Banner Slug</label>
                <input
                  value={form.bannerSlug}
                  onChange={(e) =>
                    setForm({ ...form, bannerSlug: e.target.value })
                  }
                  disabled={!!editingId}
                  className="input disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="label">Banner Link</label>
              <input
                value={form.bannerLink}
                onChange={(e) =>
                  setForm({ ...form, bannerLink: e.target.value })
                }
                className="input"
              />
            </div>

            <div>
              <label className="label">Game IDs</label>
              <input
                value={form.gameId}
                onChange={(e) =>
                  setForm({ ...form, gameId: e.target.value })
                }
                className="input"
                placeholder="mlbb, bgmi, codm"
              />
            </div>

            <div>
              <label className="label">Banner Summary</label>
              <textarea
                value={form.bannerSummary}
                onChange={(e) =>
                  setForm({ ...form, bannerSummary: e.target.value })
                }
                className="input min-h-[100px]"
              />
            </div>

            {/* Visibility */}
            <div className="flex gap-3">
              <button
                onClick={() => setForm({ ...form, isShow: true })}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold
                  ${
                    form.isShow
                      ? "bg-green-500/20 text-green-500"
                      : "border"
                  }`}
              >
                Visible
              </button>

              <button
                onClick={() => setForm({ ...form, isShow: false })}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold
                  ${
                    !form.isShow
                      ? "bg-red-500/20 text-red-500"
                      : "border"
                  }`}
              >
                Hidden
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              {editingId && (
                <button
                  onClick={resetForm}
                  className="px-5 py-2 rounded-lg border"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={editingId ? updateBanner : addBanner}
                className="px-5 py-2 rounded-lg bg-[var(--accent)] text-black font-semibold"
              >
                {editingId ? "Update Banner" : "Add Banner"}
              </button>
            </div>
          </div>

          {/* RIGHT – IMAGE PREVIEW */}
          <div className="hidden lg:block">
            <p className="text-xs font-medium mb-2 text-[var(--muted)]">
              Preview
            </p>

            {form.bannerImage ? (
              <img
                src={form.bannerImage}
                alt="Preview"
                className="w-full h-56 object-cover rounded-lg border"
              />
            ) : (
              <div className="h-56 flex items-center justify-center rounded-lg border text-xs text-[var(--muted)]">
                Image preview
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-3">
        <h3 className="text-base font-bold">All Banners</h3>

        {banners.map((b) => (
          <div
            key={b._id}
            className="
              rounded-xl border bg-[var(--card)]
              p-4 flex flex-col md:flex-row gap-4
            "
          >
            <img
              src={b.bannerImage}
              alt={b.bannerTitle}
              className="w-full md:w-40 h-20 object-cover rounded-lg border"
            />

            <div className="flex-1">
              <p className="font-semibold text-sm">{b.bannerTitle}</p>
              <p className="text-xs text-[var(--muted)]">
                {b.bannerSlug}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(b)}
                className="px-4 py-1.5 rounded-lg text-sm border"
              >
                Edit
              </button>

              <button
                onClick={() => toggleShow(b._id, b.isShow)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold
                  ${
                    b.isShow
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
              >
                {b.isShow ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
