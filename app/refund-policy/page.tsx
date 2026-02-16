"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export default function RefundPolicy() {
    const lastUpdated = "February 16, 2026";

    return (
        <main className="min-h-screen bg-[var(--background)] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Refund Policy</h1>
                    <p className="text-[var(--muted)] text-sm">Last Updated: {lastUpdated}</p>
                </div>

                <div className="space-y-10 text-[var(--foreground)] opacity-90">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Digital Goods Policy</h2>
                        <p className="leading-relaxed text-sm text-[var(--muted)]">
                            All game top-ups and digital credits sold on {BRAND} are considered intangible digital assets. Because these products are consumed instantly upon delivery, all successful transactions are strictly <strong>non-refundable and final</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Eligibility for Refund</h2>
                        <p className="mb-4 leading-relaxed text-sm text-[var(--muted)]">
                            A refund or transaction reversal may be considered only under the following specific circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted)]">
                            <li><strong>Failed Delivery:</strong> Payment confirmed but system failed to transmit credits to the game server.</li>
                            <li><strong>Double Charge:</strong> Technical glitch resulting in multiple debits for a single order instance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Non-Eligibility Scenarios</h2>
                        <p className="mb-4 leading-relaxed text-sm text-[var(--muted)]">
                            We cannot issue refunds for:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted)]">
                            <li>Incorrect Player ID, Server, or Zone ID provided by user.</li>
                            <li>Account bans or restrictions by game publishers.</li>
                            <li>Buyer's remorse or accidental purchases after delivery.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">4. Refund Process</h2>
                        <p className="leading-relaxed text-sm text-[var(--muted)]">
                            Claims must be submitted within 24 hours of the transaction. Approved refunds will be processed back via the original payment method within 5-10 business days.
                        </p>
                    </section>

                    <section className="pt-10 border-t border-[var(--border)]">
                        <p className="text-sm text-[var(--muted)]">
                            For support inquiries, contact us at:{" "}
                            <a href={`mailto:${process.env.NEXT_PUBLIC_GMAIL_USER || "billing@vampettic.com"}`} className="text-[var(--accent)] hover:underline">
                                {process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com"}
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
