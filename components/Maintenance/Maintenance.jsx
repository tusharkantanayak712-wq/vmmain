"use client";

import { useEffect, useState } from "react";
import { FiTool, FiLogOut } from "react-icons/fi";

export default function Maintenance() {
    const [show, setShow] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        // Small delay to ensure smooth mounting
        const timer = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleLoggingOff = () => {
        setIsLoggingOut(true);

        const keysToRemove = ["token", "userName", "email", "userId", "phone", "pending_topup_order", "avatar"];
        keysToRemove.forEach(key => sessionStorage.removeItem(key));
        localStorage.removeItem("mlbb_verified_players");

        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#0f172a] border border-gray-800 rounded-2xl p-8 shadow-2xl text-center">

                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                    <FiTool className="text-3xl text-blue-500" />
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-white mb-3">Under Maintenance</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    We are currently performing scheduled maintenance to improve our services. Please check back soon.
                </p>

                {/* Logout Button */}
                {!isLoggingOut ? (
                    <button
                        onClick={handleLoggingOff}
                        className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl transition-colors font-medium text-sm"
                    >
                        <FiLogOut className="text-lg" />
                        <span>Logout Session</span>
                    </button>
                ) : (
                    <div className="w-full bg-gray-800/50 py-3 rounded-xl flex items-center justify-center gap-3 text-sm text-gray-400">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span>Logging out...</span>
                    </div>
                )}

                <div className="mt-6 text-xs text-gray-600 font-medium">
                    System Maintenance • 2026
                </div>
            </div>
        </div>
    );
}
