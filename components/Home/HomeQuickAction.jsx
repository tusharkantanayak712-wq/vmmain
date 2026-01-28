"use client";

import Link from "next/link";
import { Globe, Trophy } from "lucide-react";

export default function LeaderboardRegionSection() {
  return (
    <section className="w-full px-4 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

        {/* LEFT — LEADERBOARD */}
        <Link
          href="/leaderboard"
          className="
            flex items-center gap-3
            rounded-xl
            bg-[var(--card)]
            border border-[var(--border)]
            px-4 py-3
            transition
            hover:border-[var(--accent)]
            hover:bg-[var(--muted-bg)]/40
          "
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
            <Trophy className="h-5 w-5" />
          </div>

          <span className="text-sm font-medium text-[var(--foreground)]">
            Leaderboard
          </span>
        </Link>

        {/* RIGHT — CHECK REGION */}
        <Link
          href="/check-region"
          className="
            flex items-center gap-3
            rounded-xl
            bg-[var(--card)]
            border border-[var(--border)]
            px-4 py-3
            transition
            hover:border-[var(--accent)]
            hover:bg-[var(--muted-bg)]/40
          "
        >
          <span className="text-sm font-medium text-[var(--foreground)]">
            Check Region
          </span>

          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
            <Globe className="h-5 w-5" />
          </div>
        </Link>

      </div>
    </section>
  );
}
