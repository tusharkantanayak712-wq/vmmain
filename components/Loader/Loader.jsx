import React from "react";

export default function BlueBuffSingularityLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
      <div className="relative w-48 h-48">

        {/* ================= RIPPLE WAVES ================= */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border animate-ripple"
            style={{
              borderColor: "var(--accent)",
              animationDelay: `${i * 0.9}s`,
              opacity: 0.15,
            }}
          />
        ))}

        {/* ================= AURA BREATH ================= */}
        <div
          className="absolute inset-0 rounded-full blur-3xl animate-breath"
          style={{
            background:
              "radial-gradient(circle, var(--accent), transparent 70%)",
            opacity: 0.4,
          }}
        />

        {/* ================= OUTER PHASE RING ================= */}
        <div className="absolute inset-4 rounded-full border border-[var(--accent)]/30 animate-phase-slow" />

        {/* ================= INNER COUNTER PHASE ================= */}
        <div className="absolute inset-8 rounded-full border border-[var(--accent)]/40 animate-phase-fast" />

        {/* ================= ENERGY SCAN ================= */}
        <div className="absolute inset-10 overflow-hidden rounded-full">
          <div
            className="absolute inset-0 animate-scan"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 55%, var(--accent), transparent)",
              opacity: 0.6,
            }}
          />
        </div>

        {/* ================= ORBITING SPARKS ================= */}
        {[0, 120, 240].map((deg, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-orbit"
            style={{
              animationDelay: `${i * 0.4}s`,
              animationDuration: "7s",
            }}
          >
            <div
              className="absolute w-2.5 h-2.5 rounded-full animate-flicker"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(70px)`,
                background: "var(--accent)",
                boxShadow: "0 0 14px var(--accent)",
              }}
            />
          </div>
        ))}

        {/* ================= CORE ================= */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-28 h-28 rounded-full blur-xl animate-heartbeat"
            style={{
              background:
                "radial-gradient(circle, #22d3ee, transparent 65%)",
            }}
          />

          <div
            className="relative w-18 h-18 rounded-full flex items-center justify-center animate-core-wobble"
            style={{
              background:
                "linear-gradient(145deg, var(--accent), #22d3ee)",
              boxShadow:
                "0 0 34px rgba(34,211,238,.7), inset 0 0 14px rgba(255,255,255,.3)",
            }}
          >
            <span
              className="text-xl font-extrabold"
              style={{
                color: "var(--foreground)",
                textShadow: "0 2px 14px rgba(0,0,0,.7)",
              }}
            >
              yJ
            </span>
          </div>
        </div>
      </div>

      {/* ================= TEXT ================= */}
      <div className="absolute bottom-24 text-center">
        <p className="text-sm tracking-wider text-[var(--muted)]">
          Blue Buff Resonating
        </p>
        <p className="text-xs opacity-60 mt-1">Aligning energy layers…</p>
      </div>

      {/* ================= MOTION SYSTEM ================= */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0.6);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes breath {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.5;
          }
        }

        @keyframes phaseSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes phaseFast {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes scan {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes flicker {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%,
          40%,
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes wobble {
          0%,
          100% {
            transform: rotate(-1deg) scale(1);
          }
          50% {
            transform: rotate(1deg) scale(1.03);
          }
        }

        .animate-ripple {
          animation: ripple 2.6s ease-out infinite;
        }
        .animate-breath {
          animation: breath 3.2s ease-in-out infinite;
        }
        .animate-phase-slow {
          animation: phaseSlow 10s linear infinite;
        }
        .animate-phase-fast {
          animation: phaseFast 6s linear infinite;
        }
        .animate-scan {
          animation: scan 4.2s linear infinite;
        }
        .animate-orbit {
          animation: orbit 7s ease-in-out infinite;
        }
        .animate-flicker {
          animation: flicker 1.6s ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-core-wobble {
          animation: wobble 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
