import React from "react";

export default function QuantumLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* 3D ROTATING SYSTEM */}
      <div className="relative w-48 h-48 flex items-center justify-center perspective-container">

        {/* Ring 1 - Outer Orbital (Slow) */}
        <div className="absolute w-full h-full rounded-full border border-[var(--accent)]/20 border-t-[var(--accent)]/60 animate-spin-slow"></div>

        {/* Ring 2 - Gyroscopic Inner (3D) */}
        <div className="absolute w-36 h-36 rounded-full border-2 border-transparent border-t-[var(--accent)] border-b-[var(--accent)] shadow-[0_0_15px_var(--accent)] animate-gyro-1"></div>

        {/* Ring 3 - Counter Gyro */}
        <div className="absolute w-28 h-28 rounded-full border border-dashed border-[var(--muted)]/50 animate-gyro-2"></div>

        {/* CENTRAL CORE */}
        <div className="absolute z-10 flex items-center justify-center">
          {/* Pulsing Energy Field */}
          <div className="absolute w-16 h-16 rounded-full bg-[var(--accent)]/20 blur-xl animate-pulse-fast"></div>

          {/* Solid Core */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center shadow-[0_0_20px_var(--accent)] animate-levitate">
            <span className="text-[var(--background)] font-black text-lg select-none">V</span>
          </div>
        </div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0 animate-spin-reverse-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-[0_0_8px_var(--accent)]"></div>
        </div>

      </div>

      {/* TEXT INDICATOR */}
      <div className="mt-10 flex flex-col items-center gap-1 z-10">
        {/* <h2 className="text-xl font-bold tracking-[0.3em] text-[var(--foreground)] animate-glitch-text" data-text="INITIALIZING">
          INITIALIZING
        </h2> */}
        <div className="flex gap-1.5">
          <div className="w-10 h-0.5 bg-[var(--accent)]/30 rounded-full overflow-hidden">
            <div className="h-full w-full bg-[var(--accent)] origin-left animate-loading-bar"></div>
          </div>
        </div>
        <p className="text-[10px] text-[var(--muted)] uppercase tracking-widest mt-1 opacity-70">
          Vampettic Systems
        </p>
      </div>

      <style jsx>{`
        /* 3D Perspective Setup */
        .perspective-container {
            perspective: 1200px;
            transform-style: preserve-3d;
        }

        /* Animations */
        @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
        }

        /* Complex 3D Rotations */
        @keyframes gyro-1 {
            0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
            33% { transform: rotateX(120deg) rotateY(60deg) rotateZ(120deg); }
            66% { transform: rotateX(240deg) rotateY(120deg) rotateZ(240deg); }
            100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
        }
        @keyframes gyro-2 {
            0% { transform: rotateX(360deg) rotateY(180deg) rotateZ(0deg); }
            100% { transform: rotateX(0deg) rotateY(0deg) rotateZ(360deg); }
        }

        @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes pulse-fast {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
        }

        @keyframes levitate {
             0%, 100% { transform: translateY(0); }
             50% { transform: translateY(-4px); }
        }

        @keyframes loading-bar {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(0.7); }
            100% { transform: scaleX(0); transform-origin: right; }
        }

        /* Utility Classes */
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 15s linear infinite; }
        .animate-gyro-1 { animation: gyro-1 4s linear infinite; }
        .animate-gyro-2 { animation: gyro-2 5s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 1.5s ease-in-out infinite; }
        .animate-levitate { animation: levitate 2s ease-in-out infinite; }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }

        .animate-glitch-text::before,
        .animate-glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
      `}</style>
    </div>
  );
}
