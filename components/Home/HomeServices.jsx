import { FaWhatsapp } from "react-icons/fa";

export default function HomeServices() {
  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-lg">

          {/* Accent strip */}
          <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-secondary)]" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-6 md:p-10">

            {/* Left content */}
            <div className="max-w-3xl">
              <h3 className="text-xl md:text-2xl font-extrabold mb-2 leading-tight">
                Website Designed, Developed & Maintained By Experts
              </h3>

              <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                End-to-end website solutions including UI/UX design, development,
                deployment, performance optimization, security updates, and
                long-term maintenance — all handled professionally.
              </p>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="text-lg md:text-xl font-bold text-[var(--accent)] tracking-wide">
                +91 63723 05866
              </span>

              <a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5 rounded-2xl
                  bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]
                  text-white font-semibold text-sm
                  shadow-md
                  hover:scale-[1.03] hover:brightness-110
                  active:scale-95
                  transition-all duration-200
                "
              >
                <FaWhatsapp className="text-lg" />
                Get This Service
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
