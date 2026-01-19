"use client";

import { useState } from "react";

export default function SupportQueriesTab({ queries = [], onUpdateStatus }) {
  const [activeQuery, setActiveQuery] = useState(null);

  const statusMeta = {
    open: {
      label: "Open",
      class: "bg-yellow-500/15 text-yellow-400",
    },
    in_progress: {
      label: "In Progress",
      class: "bg-blue-500/15 text-blue-400",
    },
    resolved: {
      label: "Resolved",
      class: "bg-green-500/15 text-green-400",
    },
    closed: {
      label: "Closed",
      class: "bg-gray-500/15 text-gray-400",
    },
  };

  const getStatus = (status) => status || "open";

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-lg font-extrabold tracking-tight">
          Support Queries
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Messages submitted by users that require attention.
        </p>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--card)]">
        <table className="w-full text-sm">
          <thead className="bg-black/10">
            <tr className="text-left text-xs uppercase tracking-wide text-[var(--muted)]">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Message</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {queries.map((q) => {
              const status = getStatus(q.status);
              const meta = statusMeta[status];

              return (
                <tr
                  key={q._id}
                  onClick={() => setActiveQuery(q)}
                  className="
                    border-t border-[var(--border)]
                    hover:bg-black/5
                    cursor-pointer
                    transition
                  "
                >
                  <td className="px-5 py-3">
                    <div className="font-medium break-all">
                      {q.email || "User"}
                    </div>
                    {q.phone && (
                      <div className="text-xs text-[var(--muted)]">
                        {q.phone}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-3 capitalize text-[var(--muted)]">
                    {q.type}
                  </td>

                  <td className="px-5 py-3 max-w-sm truncate text-[var(--muted)]">
                    {q.message}
                  </td>

                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${meta.class}`}
                    >
                      {meta.label}
                    </span>
                  </td>

                  <td className="px-5 py-3 text-xs text-[var(--muted)]">
                    {new Date(q.createdAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}

            {queries.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-[var(--muted)]"
                >
                  No support queries yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {queries.map((q) => {
          const status = getStatus(q.status);
          const meta = statusMeta[status];

          return (
            <div
              key={q._id}
              onClick={() => setActiveQuery(q)}
              className="
                rounded-xl border border-[var(--border)]
                bg-[var(--card)]
                p-4
                space-y-2
                active:scale-[0.98]
                transition
              "
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold truncate">
                  {q.email || q.phone || "User"}
                </div>

                <span
                  className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${meta.class}`}
                >
                  {meta.label}
                </span>
              </div>

              <div className="text-xs capitalize text-[var(--muted)]">
                {q.type}
              </div>

              <p className="text-sm text-[var(--foreground)] line-clamp-2">
                {q.message}
              </p>

              <div className="text-xs text-[var(--muted)]">
                {new Date(q.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}

        {queries.length === 0 && (
          <p className="text-center text-[var(--muted)] py-8">
            No support queries yet
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {activeQuery && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="
            w-full max-w-md
            rounded-2xl
            bg-[var(--card)]
            border border-[var(--border)]
            p-6
            space-y-4
          ">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                Support Query Details
              </h3>
              <button
                onClick={() => setActiveQuery(null)}
                className="text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-sm">
              <Info
                label="Contact"
                value={
                  activeQuery.email ||
                  activeQuery.phone ||
                  "-"
                }
              />

              <Info
                label="Type"
                value={activeQuery.type}
                capitalize
              />

              <div>
                <p className="text-xs text-[var(--muted)] mb-1">
                  Message
                </p>
                <p className="font-medium whitespace-pre-wrap break-words">
                  {activeQuery.message}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--muted)] mb-1">
                  Status
                </p>
                <select
                  value={getStatus(activeQuery.status)}
                  onChange={(e) => {
                    onUpdateStatus(
                      activeQuery._id,
                      e.target.value
                    );
                    setActiveQuery(null);
                  }}
                  className="
                    w-full h-9
                    rounded-lg
                    border border-[var(--border)]
                    bg-[var(--background)]
                    text-sm
                  "
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <p className="text-xs text-[var(--muted)]">
                Created:{" "}
                {new Date(
                  activeQuery.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= HELPER ================= */
function Info({ label, value, capitalize }) {
  return (
    <div>
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className={`font-medium ${capitalize ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  );
}
