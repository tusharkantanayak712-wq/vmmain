"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export default function TermsAndConditions() {
  const lastUpdated = "February 16, 2026";

  return (
    <main className="min-h-screen bg-[var(--background)] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
          <p className="text-[var(--muted)] text-sm">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-10 text-[var(--foreground)] opacity-90">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)]">
              By accessing the {BRAND} website, you agree to be bound by these Terms. Our Service allows you to purchase digital products and game top-ups. If you disagree with any part of the terms, you must not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Service Usage</h2>
            <p className="mb-4 leading-relaxed text-sm text-[var(--muted)]">
              To use our Service, you must provide accurate information. You are solely responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted)]">
              <li>Ensuring Game ID, Server, and Zone ID details are correct.</li>
              <li>Maintaining the security of your account and session.</li>
              <li>All activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Payments & Deliveries</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)]">
              All transactions are processed through secure gateways. By placing an order, you authorize the specified charge. Deliveries are typically processed instantly but may take longer depending on game server status.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Prohibited Activities</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)]">
              Users are prohibited from using automation, exploiting bugs, or attempting fraudulent transactions. We reserve the right to terminate access for any violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Disclaimer</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)] italic">
              {BRAND} is an independent platform and is NOT affiliated with, endorsed by, or sponsored by any game publishers (Moonton, Garena, Krafton, etc.).
            </p>
          </section>

          <section className="pt-10 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--muted)]">
              For legal inquiries, contact us at:{" "}
              <a href={`mailto:${process.env.NEXT_PUBLIC_GMAIL_USER || "legal@vampettic.com"}`} className="text-[var(--accent)] hover:underline">
                {process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com"}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}


