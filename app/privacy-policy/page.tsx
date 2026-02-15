"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <p className="mb-8 italic">Last updated: February 15, 2026</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
          <p className="leading-relaxed">
            We collect information that is necessary for processing your game top-up orders. This includes:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Game details: User ID, Zone ID, and Character Name.</li>
            <li>Contact details: Phone number and Email address.</li>
            <li>Order history and transaction details.</li>
          </ul>
          <p className="mt-4">
            We do not store your payment credentials. All payments are handled by secure external payment providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
          <p className="leading-relaxed">
            Your data is used solely for:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Processing and delivering your orders.</li>
            <li>Sending you order updates and receipts.</li>
            <li>Providing customer support.</li>
            <li>Ensuring the security of our platform and preventing fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Data Protection</h2>
          <p className="leading-relaxed">
            We use industry-standard security measures to protect your information. Your data is encrypted during transmission and stored securely. We do not sell or share your personal information with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
          <p className="leading-relaxed">
            We use essential cookies to manage your login sessions and preferences. You can manage cookie settings in your browser, but some features of the site may not work without them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
          <p className="leading-relaxed">
            You have the right to access, correct, or request the deletion of your personal data. To exercise these rights, please contact our support team.
          </p>
        </section>

        <section className="pt-8 border-t border-gray-800">
          <p>
            If you have any questions about this policy, please contact us at:
            <a href={`mailto:${process.env.NEXT_PUBLIC_GMAIL_USER}`} className="text-blue-400 ml-1">{process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com"}</a>
          </p>
        </section>
      </div>
    </main>
  );
}
