"use client";

export default function UsersTab({
  users = [],
  updatingUserId,
  onChangeRole,
  page = 1,
  limit = 10,
}) {
  const getIndex = (i) => (page - 1) * limit + i + 1;

  return (
    <div className="w-full space-y-4">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-3">
        {users.map((u, i) => (
          <div
            key={u._id}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-[var(--muted)]">
                #{getIndex(i)}
              </span>

              {updatingUserId === u.userId && (
                <span className="text-xs text-[var(--muted)]">
                  Updating…
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Avatar user={u} />

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {u.name}
                </p>
                <p className="text-xs text-[var(--muted)] truncate">
                  {u.email}
                </p>
              </div>
            </div>

            <p className="mt-2 text-sm text-[var(--muted)]">
              📞 {u.phone || "N/A"}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm">
                Orders: <b>{u.order}</b>
              </span>

              <select
                value={u.userType}
                disabled={u.userType === "owner"}
                onChange={(e) =>
                  onChangeRole(u.userId, e.target.value)
                }
                className="
                  h-8 px-3 rounded-lg
                  border border-[var(--border)]
                  bg-[var(--background)]
                  text-sm
                "
              >
                <option value="user">User</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                {u.userType === "owner" && (
                  <option value="owner">Owner</option>
                )}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <table className="w-full text-sm">
          <thead className="bg-black/10">
            <tr className="text-xs uppercase tracking-wide text-[var(--muted)]">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr
                key={u._id}
                className="border-t border-[var(--border)] hover:bg-black/5 transition"
              >
                <td className="px-4 py-3 text-xs text-[var(--muted)]">
                  {getIndex(i)}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar user={u} />

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {u.name}
                      </p>
                      <p className="text-xs text-[var(--muted)] truncate">
                        {u.userId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-xs break-all">
                  {u.email}
                </td>

                <td className="px-4 py-3 text-xs">
                  {u.phone || "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={u.userType}
                      disabled={u.userType === "owner"}
                      onChange={(e) =>
                        onChangeRole(u.userId, e.target.value)
                      }
                      className="
                        h-8 px-3 rounded-lg
                        border border-[var(--border)]
                        bg-[var(--background)]
                        text-sm
                      "
                    >
                      <option value="user">User</option>
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      {u.userType === "owner" && (
                        <option value="owner">Owner</option>
                      )}
                    </select>

                    {updatingUserId === u.userId && (
                      <span className="text-xs text-[var(--muted)]">
                        Updating…
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= AVATAR ================= */

function Avatar({ user }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="h-9 w-9 rounded-full object-cover border border-[var(--border)]"
      />
    );
  }

  // Fallback initials from userId
  const initials = user.userId
    ?.replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        h-9 w-9 rounded-full
        flex items-center justify-center
        text-xs font-bold text-white
        bg-gradient-to-br from-[var(--accent)] to-purple-500
      "
    >
      {initials || "U"}
    </div>
  );
}
