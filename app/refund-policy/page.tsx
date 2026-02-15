"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export default function RefundPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
            <h1 className="text-3xl font-bold text-white mb-6">Refund Policy</h1>
            <p className="mb-8 italic text-sm">Last updated: February 15, 2026</p>

            <div className="space-y-10">
                <section>
                    <h2 className="text-xl font-semibold text-white mb-4">1. Digital Products Policy</h2>
                    <p className="leading-relaxed">
                        All game top-ups and digital credits sold on {BRAND} are considered <strong>digital services</strong> that are consumed instantly upon delivery. Because of the nature of these products, all successful transactions are <strong>final and non-refundable</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-4">2. Eligibility for Refund</h2>
                    <p className="leading-relaxed mb-4">
                        A refund or transaction reversal may be considered only under the following specific circumstances:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li><strong>Failed Delivery:</strong> If the payment was successful but the credits were not delivered to your game account due to a technical error on our platform.</li>
                        <li><strong>Duplicate Payment:</strong> If you were charged twice for the same order due to a payment gateway glitch.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-4">3. Non-Refundable Scenarios</h2>
                    <p className="leading-relaxed mb-4">
                        We cannot issue refunds for the following reasons:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li><strong>User Error:</strong> Entering the wrong Game ID, Zone ID, or Server details. It is the user's responsibility to ensure account details are accurate before purchase.</li>
                        <li><strong>Game Publisher Actions:</strong> If your account is banned, restricted, or currency is adjusted by the game publisher (Moonton, Garena, etc.) after a successful top-up.</li>
                        <li><strong>Change of Mind:</strong> If you decide you no longer want the credits after the delivery process has started.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-4">4. Refund Process</h2>
                    <p className="leading-relaxed">
                        If you believe you are eligible for a refund, please contact our support team within 24 hours of the transaction. You must provide your <strong>Order ID</strong> and proof of payment.
                    </p>
                    <p className="mt-4">
                        Approved refunds will be processed back to the original payment method within <strong>5 to 7 business days</strong>, depending on your bank's policies.
                    </p>
                </section>

                <section className="pt-8 border-t border-gray-800">
                    <p className="mb-2">For refund inquiries, please email us at:</p>
                    <p className="font-semibold text-white">{process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com"}</p>
                </section>
            </div>
        </main>
    );
}
