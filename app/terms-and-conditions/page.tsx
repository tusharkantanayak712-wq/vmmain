"use client";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export default function TermsAndConditions() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
      <h1 className="text-3xl font-bold text-white mb-6">Terms & Conditions</h1>
      <p className="mb-8 italic text-sm">Last updated: February 15, 2026</p>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
          <p className="leading-relaxed">
            By accessing or using the {BRAND} website (the "Service"), you agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and others who access or use the Service. If you disagree with any part of the terms, you may not access the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">2. Service Usage & Account Responsibility</h2>
          <p className="leading-relaxed mb-4">
            Our Service allows you to purchase digital products and game top-ups. To use the Service, you must provide accurate and complete information.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Accuracy:</strong> You are solely responsible for ensures that the Game ID, Zone ID, and Server details provided are correct. {BRAND} is not responsible for credits delivered to the wrong account due to user error.</li>
            <li><strong>Eligibility:</strong> By using this Service, you represent that you are at least 13 years of age or have the consent of a legal guardian.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">3. Payments and Refund Policy</h2>
          <p className="leading-relaxed mb-4">
            Payments are processed through secure third-party gateways. By placing an order, you authorize us to charge the specified amount.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Final Sale:</strong> Due to the nature of digital goods, all successful top-ups are non-refundable and non-exchangeable once the delivery has been initiated.</li>
            <li><strong>Refund Eligibility:</strong> Refunds will only be considered if a technical error on our side prevents the delivery of the product. In such cases, the refund will be processed to the original payment source within 5-7 business days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">4. Prohibited Activities</h2>
          <p className="leading-relaxed mb-4">
            Users are strictly prohibited from:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Using the Service for any fraudulent or illegal transactions.</li>
            <li>Attempting to exploit system bugs or vulnerabilities for personal gain.</li>
            <li>Reselling {BRAND} services without explicit written permission.</li>
            <li>Interfering with the security or operation of the website.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">5. Intellectual Property</h2>
          <p className="leading-relaxed">
            The Service and its original content (excluding game logos and trademarks owned by third parties), features, and functionality are and will remain the exclusive property of {BRAND}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
          <p className="leading-relaxed">
            In no event shall {BRAND} be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or game account status (bans/restrictions) resulting from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">7. Disclaimer</h2>
          <p className="leading-relaxed">
            {BRAND} is an independent platform and is NOT affiliated with, endorsed by, or sponsored by any game publishers (Moonton, Garena, Krafton, etc.). All game names and trademarks belong to their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-4">8. Termination</h2>
          <p className="leading-relaxed">
            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section className="pt-8 border-t border-gray-800">
          <p className="mb-2">If you have any questions regarding these Terms, please contact us:</p>
          <p className="font-semibold text-white">Email: {process.env.NEXT_PUBLIC_GMAIL_USER || "vampettic@gmail.com"}</p>
        </section>
      </div>
    </main>
  );
}
