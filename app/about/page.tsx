import Link from "next/link";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Vampettic";

export const metadata = {
  title: `About | ${BRAND}`,
  description: `Learn more about ${BRAND} — a fast, secure, and affordable game top-up platform.`,
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-300">
      <h1 className="text-4xl font-bold text-white mb-6 underline decoration-[var(--accent)] underline-offset-8">
        About {BRAND}
      </h1>

      <div className="space-y-10">
        <section>
          <p className="text-lg leading-relaxed mb-4 text-white font-medium">
            {BRAND} is your trusted destination for instant game top-ups, safe payments, and automated delivery.
          </p>
          <p className="leading-relaxed">
            We built this platform to make in-game purchases simple and reliable. Our mission is to provide players with a seamless experience that delivers game currency instantly, 24/7, without any risks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-[var(--accent)] font-bold mb-1">⚡ Instant Delivery</h3>
              <p>Your orders are processed automatically the second payment is confirmed. No waiting around.</p>
            </div>
            <div>
              <h3 className="text-[var(--accent)] font-bold mb-1">🔐 Safe & Secure</h3>
              <p>We use verified payment gateways and secure protocols to protect every transaction.</p>
            </div>
            <div>
              <h3 className="text-[var(--accent)] font-bold mb-1">💰 Fair Pricing</h3>
              <p>We offer competitive rates with zero hidden charges. What you see is what you pay.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment</h2>
          <p className="leading-relaxed">
            We are dedicated to providing the best service to the gaming community. Whether you're topping up for Mobile Legends or other favorites, we ensure your credits reach you safely and quickly.
          </p>
        </section>

        <section className="pt-8 border-t border-gray-800">
          <p>
            Stay updated with our latest offers on Instagram:
            <a
              href="https://instagram.com/vampettic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 ml-1 font-bold"
            >
              @vampettic
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
