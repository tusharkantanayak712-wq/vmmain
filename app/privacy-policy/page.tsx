"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export default function PrivacyPolicy() {
  const lastUpdated = "February 16, 2026";

  return (
    <main className="min-h-screen bg-[var(--background)] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-[var(--muted)] text-sm">Last Updated: {lastUpdated}</p>
        </div>

        <div className="space-y-10 text-[var(--foreground)] opacity-90">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4 leading-relaxed">
              We collect information to provide better services to our users. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted)]">
              <li>Game details: Player ID, Zone ID, and Server information.</li>
              <li>Contact information: Email address and phone number.</li>
              <li>Transaction data: Purchase history and order status.</li>
              <li>Technical data: IP address and browser type for security monitoring.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Information</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)]">
              Your information is used solely for processing orders, providing support, and maintaining platform security. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Data Security</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)]">
              We implement industry-standard security measures to protect your data. All payment processes are handled by secure, PCI-compliant third-party providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Your Rights</h2>
            <p className="leading-relaxed text-sm text-[var(--muted)]">
              You have the right to access, correct, or delete your personal information. Contact our support team for any data-related requests.
            </p>
          </section>

          <section className="pt-10 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--muted)]">
              For questions regarding this policy, contact us at:{" "}
              <a href={`mailto:${process.env.NEXT_PUBLIC_GMAIL_USER || "support@vampettic.com"}`} className="text-[var(--accent)] hover:underline">
                {process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com"}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}


