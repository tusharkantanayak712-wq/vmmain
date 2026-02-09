import { FiTool } from "react-icons/fi";

export const metadata = {
  title: "Under Maintenance",
  robots: "noindex, nofollow",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black/95">
      <div className="w-full max-w-md bg-[#0f172a] border border-gray-800 rounded-2xl p-8 shadow-2xl text-center">

        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
          <FiTool className="text-3xl text-blue-500" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-white mb-3">Under Maintenance</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          We are currently performing scheduled maintenance to improve our services. Please check back soon.
        </p>

        <div className="mt-6 text-xs text-gray-600 font-medium">
          System Maintenance • 2026
        </div>
      </div>
    </main>
  );
}
