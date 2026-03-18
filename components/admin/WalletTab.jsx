"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wallet,
    Search,
    RefreshCcw,
    Plus,
    Minus,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    User,
    MoreVertical,
    ChevronRight,
    Loader2,
    TrendingUp,
    History,
    CheckCircle2,
    XCircle,
    Download,
} from "lucide-react";

export default function WalletTab() {
    const [activeSubTab, setActiveSubTab] = useState("users"); // users | history
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        try {
            setIsExporting(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/wallet/export", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `ledger_export_${new Date().getTime()}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert("Export failed");
        } finally {
            setIsExporting(false);
        }
    };

    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [userSearch, setUserSearch] = useState("");
    const [userPage, setUserPage] = useState(1);
    const [userPagination, setUserPagination] = useState({ total: 0, totalPages: 1 });

    const [transactions, setTransactions] = useState([]);
    const [loadingTx, setLoadingTx] = useState(true);
    const [txSearch, setTxSearch] = useState("");
    const [txPage, setTxPage] = useState(1);
    const [txPagination, setTxPagination] = useState({ total: 0, totalPages: 1 });

    const [selectedUser, setSelectedUser] = useState(null);
    const [updateModal, setUpdateModal] = useState({ show: false, action: "add", amount: "", description: "" });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (activeSubTab === "users") fetchUsers();
        else fetchHistory();
    }, [activeSubTab, userPage, txPage, userSearch, txSearch]);

    const fetchStats = async () => {
        try {
            setLoadingStats(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/wallet/stats", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) setStats(data.stats);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStats(false);
        }
    };

    const fetchUsers = async () => {
        try {
            setLoadingUsers(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/users?page=${userPage}&limit=10&search=${userSearch}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
                setUserPagination(data.pagination);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingUsers(false);
        }
    };

    const fetchHistory = async () => {
        try {
            setLoadingTx(true);
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/wallet/transactions?page=${txPage}&limit=10&search=${txSearch}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setTransactions(data.data);
                setTxPagination(data.pagination);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingTx(false);
        }
    };

    const handleUpdateBalance = async () => {
        if (!updateModal.amount || isNaN(Number(updateModal.amount))) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            setIsUpdating(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/wallet/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: selectedUser.userId,
                    amount: Number(updateModal.amount),
                    action: updateModal.action,
                    description: updateModal.description,
                }),
            });

            const data = await res.json();
            if (data.success) {
                alert(data.message);
                setUpdateModal({ show: false, action: "add", amount: "", description: "" });
                setSelectedUser(null);
                fetchUsers();
                fetchStats();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Wallet Control</h2>
                    <p className="text-sm text-[var(--muted)] mt-1">Manage user balances and monitor platform capital.</p>
                </div>
                <div className="flex bg-[var(--foreground)]/[0.03] p-1 rounded-xl border border-[var(--border)]">
                    <button
                        onClick={() => setActiveSubTab("users")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "users" ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20" : "text-[var(--muted)]"}`}
                    >
                        USERS
                    </button>
                    <button
                        onClick={() => setActiveSubTab("history")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSubTab === "history" ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20" : "text-[var(--muted)]"}`}
                    >
                        HISTORY
                    </button>
                </div>
            </div>

            {/* STATS */}
            {!loadingStats && stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                        label="Platform Liquidity"
                        value={`₹${stats.totalPlatformWallet}`}
                        icon={<Wallet size={16} />}
                        color="var(--accent)"
                        description="Total balance across all users"
                    />
                    <StatCard
                        label="Activity Volume"
                        value={stats.totalTransactionCount}
                        icon={<History size={16} />}
                        color="#ec4899"
                        description="Total wallet operations items"
                    />
                    <StatCard
                        label="Inbound Feed"
                        value={stats.transactionsToday}
                        icon={<TrendingUp size={16} />}
                        color="#10b981"
                        description="Wallet transactions documented today"
                    />
                </div>
            )}

            {/* SEARCH */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]/40" size={16} />
                <input
                    value={activeSubTab === "users" ? userSearch : txSearch}
                    onChange={(e) => {
                        if (activeSubTab === "users") { setUserSearch(e.target.value); setUserPage(1); }
                        else { setTxSearch(e.target.value); setTxPage(1); }
                    }}
                    placeholder={activeSubTab === "users" ? "Search user by name, email or ID..." : "Search history by ID or description..."}
                    className="w-full h-11 pl-11 pr-4 rounded-xl border border-[var(--border)] bg-[var(--foreground)]/[0.02] text-[var(--foreground)] text-sm outline-none focus:border-[var(--accent)]/50 transition-all"
                />

                {activeSubTab === "history" && (
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 rounded-lg bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                        Export CSV
                    </button>
                )}
            </div>

            {/* CONTENT */}
            <AnimatePresence mode="wait">
                {activeSubTab === "users" ? (
                    <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {loadingUsers ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-3">
                                <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
                                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">Scanning Network</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider border-b border-[var(--border)]">
                                    <div className="col-span-4">User Identity</div>
                                    <div className="col-span-3">Contact</div>
                                    <div className="col-span-2 text-right">Balance</div>
                                    <div className="col-span-3 text-right">Actions</div>
                                </div>
                                {users.map((u) => (
                                    <div key={u._id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 lg:p-2 lg:px-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/30 transition-all">
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center text-white font-black text-xs">
                                                {u.name?.charAt(0) || "U"}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-[var(--foreground)] truncate">{u.name}</p>
                                                <p className="text-[10px] text-[var(--muted)] font-mono">{u.userId}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="text-xs text-[var(--foreground)] font-medium truncate">{u.email}</p>
                                            <p className="text-[10px] text-[var(--muted)]">{u.phone || "No Phone"}</p>
                                        </div>
                                        <div className="col-span-2 text-left lg:text-right">
                                            <span className="text-base font-black text-[var(--accent)] tracking-tighter tabular-nums">₹{u.wallet || 0}</span>
                                        </div>
                                        <div className="col-span-3 flex justify-end gap-2">
                                            <button
                                                onClick={() => { setSelectedUser(u); setUpdateModal({ ...updateModal, show: true, action: "add" }); }}
                                                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                                            >
                                                <Plus size={12} className="inline mr-1" /> Add
                                            </button>
                                            <button
                                                onClick={() => { setSelectedUser(u); setUpdateModal({ ...updateModal, show: true, action: "subtract" }); }}
                                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all"
                                            >
                                                <Minus size={12} className="inline mr-1" /> Sub
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {/* PAGINATION */}
                                {userPagination.totalPages > 1 && (
                                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                        <span className="text-[10px] font-bold text-[var(--muted)]">PAGE {userPage} / {userPagination.totalPages}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => setUserPage(p => Math.max(1, p - 1))} disabled={userPage === 1} className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-30"><ChevronRight size={14} className="rotate-180" /></button>
                                            <button onClick={() => setUserPage(p => Math.min(userPagination.totalPages, p + 1))} disabled={userPage === userPagination.totalPages} className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-30"><ChevronRight size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {loadingTx ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-3">
                                <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
                                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest">Retrieving Logs</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider border-b border-[var(--border)]">
                                    <div className="col-span-3">Timestamp</div>
                                    <div className="col-span-3">User</div>
                                    <div className="col-span-4">Operation Summary</div>
                                    <div className="col-span-2 text-right">Value</div>
                                </div>
                                {transactions.map((t) => (
                                    <div key={t._id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/10 transition-all">
                                        <div className="col-span-3 flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'credit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                {t.type === 'credit' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-[var(--foreground)]">{new Date(t.createdAt).toLocaleDateString()}</p>
                                                <p className="text-[9px] text-[var(--muted)]">{new Date(t.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <p className="text-xs font-bold text-[var(--foreground)] truncate">{t.userEmail}</p>
                                            <p className="text-[10px] text-[var(--muted)] font-mono">{t.userId}</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="text-[11px] font-medium text-[var(--foreground)] leading-tight">{t.description}</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[9px] font-bold text-[var(--muted)]/50 uppercase tracking-tighter">B: ₹{t.balanceBefore}</span>
                                                <span className="text-[9px] font-bold text-[var(--muted)]/50 uppercase tracking-tighter">A: ₹{t.balanceAfter}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-left lg:text-right">
                                            <span className={`text-base font-black tracking-tighter tabular-nums ${t.type === 'credit' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {t.type === 'credit' ? '+' : '-'}₹{t.amount}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {/* PAGINATION */}
                                {txPagination.totalPages > 1 && (
                                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                        <span className="text-[10px] font-bold text-[var(--muted)]">PAGE {txPage} / {txPagination.totalPages}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => setTxPage(p => Math.max(1, p - 1))} disabled={txPage === 1} className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-30"><ChevronRight size={14} className="rotate-180" /></button>
                                            <button onClick={() => setTxPage(p => Math.min(txPagination.totalPages, p + 1))} disabled={txPage === txPagination.totalPages} className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-30"><ChevronRight size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UPDATE MODAL */}
            <AnimatePresence>
                {updateModal.show && selectedUser && (
                    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isUpdating && setUpdateModal({ ...updateModal, show: false })} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-[var(--background)] border border-[var(--border)] rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                            <div className={`absolute top-0 left-0 w-full h-1 ${updateModal.action === 'add' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">Balance Adjustment</h3>
                            <p className="text-xs text-[var(--muted)] mb-6">Updating wallet for <span className="font-bold text-[var(--foreground)]">{selectedUser.name}</span></p>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider ml-1">Transfer Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={updateModal.amount}
                                        onChange={(e) => setUpdateModal({ ...updateModal, amount: e.target.value })}
                                        autoFocus
                                        placeholder="0.00"
                                        className="w-full h-12 px-4 mt-1 rounded-2xl border border-[var(--border)] bg-[var(--foreground)]/[0.03] text-lg font-black text-[var(--foreground)] focus:border-[var(--accent)] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider ml-1">Operation Memo</label>
                                    <textarea
                                        value={updateModal.description}
                                        onChange={(e) => setUpdateModal({ ...updateModal, description: e.target.value })}
                                        placeholder="Enter reason for adjustment..."
                                        className="w-full h-24 px-4 py-3 mt-1 rounded-2xl border border-[var(--border)] bg-[var(--foreground)]/[0.03] text-sm text-[var(--foreground)] focus:border-[var(--accent)] outline-none resize-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <button
                                    disabled={isUpdating}
                                    onClick={() => setUpdateModal({ ...updateModal, show: false })}
                                    className="h-12 rounded-2xl border border-[var(--border)] text-xs font-bold text-[var(--muted)] hover:bg-[var(--foreground)]/[0.05] transition-all disabled:opacity-50"
                                >
                                    CANCEL
                                </button>
                                <button
                                    disabled={isUpdating}
                                    onClick={handleUpdateBalance}
                                    className={`h-12 rounded-2xl text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${updateModal.action === 'add' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-500 shadow-rose-500/20'}`}
                                >
                                    {isUpdating ? <Loader2 size={16} className="animate-spin" /> : (updateModal.action === 'add' ? 'CONFIRM CREDIT' : 'CONFIRM DEBIT')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ label, value, icon, color, description }) {
    return (
        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-all" style={{ backgroundColor: color }} />
            <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg text-white" style={{ backgroundColor: color }}>{icon}</div>
                <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-[0.15em]">{label}</span>
            </div>
            <p className="text-2xl font-black text-[var(--foreground)] tracking-tighter tabular-nums">{value}</p>
            <p className="text-[10px] text-[var(--muted)] mt-1 font-medium">{description}</p>
        </div>
    );
}
