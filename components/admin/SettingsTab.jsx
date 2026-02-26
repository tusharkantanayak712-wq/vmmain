"use client";

import { useState, useEffect } from "react";
import { Settings, AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsTab() {
    const [settings, setSettings] = useState({ maintenanceMode: false });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success) {
                setSettings(data.settings);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (updatedSettings) => {
        try {
            setSaving(true);
            const token = sessionStorage.getItem("token");
            const res = await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedSettings),
            });
            const data = await res.json();
            if (!data.success) {
                alert(data.message || "Failed to update");
                return false;
            }
            return true;
        } catch (err) {
            alert("Something went wrong");
            return false;
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (e) => {
        const newValue = e.target.checked;
        const newSettings = { ...settings, maintenanceMode: newValue };

        // Store current settings to revert if needed
        const prevSettings = settings;

        // Optimistic update
        setSettings(newSettings);

        const success = await updateSettings(newSettings);
        if (!success) {
            // Revert on failure
            setSettings(prevSettings);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">Loading Settings</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto py-4">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
                <div className="p-2.5 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Settings size={22} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)]">System Config</h2>
                    <p className="text-xs text-[var(--muted)]">Manage core platform availability and global behavior.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* MAINTENANCE MODE SECTION */}
                <div className="p-6 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] relative overflow-hidden group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-[var(--foreground)]">Platform Maintenance</h3>
                                {settings.maintenanceMode ? (
                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[9px] font-black uppercase tracking-tighter border border-orange-500/20">
                                        <AlertTriangle size={10} /> Active
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-tighter border border-emerald-500/20">
                                        <ShieldCheck size={10} /> Online
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-[var(--muted)] leading-relaxed max-w-sm">
                                Enabling maintenance will block all public access to the platform, showing an "Under Maintenance" overlay. Only administrators can bypass this.
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.maintenanceMode}
                                onChange={handleToggle}
                                disabled={saving}
                            />
                            <div className="w-14 h-8 bg-[var(--foreground)]/[0.05] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[var(--accent)] border border-[var(--border)]"></div>
                        </label>
                    </div>

                    {settings.maintenanceMode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-3"
                        >
                            <AlertTriangle className="text-orange-500 shrink-0" size={18} />
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">Warning: System Shutdown</p>
                                <p className="text-[10px] text-orange-500/70 leading-snug">
                                    Total platform accessibility will be restricted. Only users with owner privileges can browse the site.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
}
