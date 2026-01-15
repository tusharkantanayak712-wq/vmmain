export const metadata = {
  title: "Under Maintenance",
  robots: "noindex, nofollow",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-slate-950 px-4">
      <div
        className="
          w-full max-w-md rounded-2xl
          border border-cyan-500/20
          bg-slate-900/70 backdrop-blur
          shadow-[0_0_60px_rgba(34,211,238,0.15)]
          p-8 text-center
        "
      >
        {/* Brand */}
        {/* <h1 className="text-3xl font-bold tracking-wide text-white">
          Your<span className="text-cyan-400">Brand</span>
        </h1> */}

        {/* Loader */}
        <div className="my-8 flex justify-center">
          <div className="h-14 w-14 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-white">
          We’re Under Maintenance 🚧
        </h2>

        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          We’re upgrading our systems to give you a faster and smoother
          experience. Please check back shortly.
        </p>

        {/* Optional info */}
        {/* <div className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} YourBrand · All rights reserved
        </div> */}
      </div>
    </main>
  );
}
