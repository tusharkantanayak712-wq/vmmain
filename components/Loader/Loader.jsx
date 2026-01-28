import React from "react";

export default function BlueBuffSingularityLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
      <div className="relative w-40 h-40">

        {/* ================= FAST RIPPLE WAVES ================= */}
        {[0, 1].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border animate-ripple"
            style={{
              borderColor: "var(--accent)",
              animationDelay: `${i * 0.4}s`,
              opacity: 0.2,
            }}
          />
        ))}

        {/* ================= AURA BREATH ================= */}
        <div
          className="absolute inset-0 rounded-full blur-2xl animate-breath"
          style={{
            background:
              "radial-gradient(circle, var(--accent), transparent 65%)",
            opacity: 0.45,
          }}
        />

        {/* ================= ROTATION RINGS ================= */}
        <div className="absolute inset-4 rounded-full border border-[var(--accent)]/40 animate-phase-slow" />
        <div className="absolute inset-7 rounded-full border border-[var(--accent)]/50 animate-phase-fast" />

        {/* ================= ENERGY SCAN ================= */}
        <div className="absolute inset-9 overflow-hidden rounded-full">
          <div
            className="absolute inset-0 animate-scan"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 60%, var(--accent), transparent)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* ================= ORBITING SPARKS ================= */}
        {[0, 120, 240].map((deg, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-orbit"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div
              className="absolute w-2 h-2 rounded-full animate-flicker"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(56px)`,
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
              }}
            />
          </div>
        ))}

        {/* ================= CORE ================= */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="absolute w-24 h-24 rounded-full blur-xl animate-heartbeat"
            style={{
              background:
                "radial-gradient(circle, #22d3ee, transparent 65%)",
            }}
          />

          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center animate-core-wobble"
            style={{
              background:
                "linear-gradient(145deg, var(--accent), #22d3ee)",
              boxShadow:
                "0 0 28px rgba(34,211,238,.8), inset 0 0 10px rgba(255,255,255,.35)",
            }}
          >
            <span
              className="text-lg font-extrabold"
              style={{
                color: "var(--foreground)",
                textShadow: "0 2px 12px rgba(0,0,0,.6)",
              }}
            >
              V
            </span>
          </div>
        </div>
      </div>

      {/* ================= TEXT ================= */}
      <div className="absolute bottom-24 text-center">
        <p className="text-sm tracking-wider text-[var(--muted)]">
          Initializing…
        </p>
        <p className="text-xs opacity-60 mt-1">Syncing systems</p>
      </div>

      {/* ================= MOTION SYSTEM (FAST) ================= */}
      <style jsx>{`
        @keyframes ripple {
          from {
            transform: scale(0.7);
            opacity: 0.35;
          }
          to {
            transform: scale(1.25);
            opacity: 0;
          }
        }

        @keyframes breath {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.55;
          }
        }

        @keyframes phaseSlow {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes phaseFast {
          to {
            transform: rotate(-360deg);
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
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes wobble {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(1deg) scale(1.04);
          }
        }

        .animate-ripple {
          animation: ripple 1.6s ease-out infinite;
        }
        .animate-breath {
          animation: breath 2.2s ease-in-out infinite;
        }
        .animate-phase-slow {
          animation: phaseSlow 6s linear infinite;
        }
        .animate-phase-fast {
          animation: phaseFast 3.5s linear infinite;
        }
        .animate-scan {
          animation: scan 2.4s linear infinite;
        }
        .animate-orbit {
          animation: orbit 4s linear infinite;
        }
        .animate-flicker {
          animation: flicker 1.1s ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-core-wobble {
          animation: wobble 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
