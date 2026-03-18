import { useState, useEffect } from "react";
import { FaWallet, FaGooglePay, FaBitcoin, FaHistory, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface WalletTabProps {
  walletBalance: number;
  setWalletBalance: (balance: number) => void;
}

export default function WalletTab({
  walletBalance,
  setWalletBalance,
}: WalletTabProps) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedPhone, setStoredPhone] = useState("");

  // History states
  const [transactions, setTransactions] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const phone = localStorage.getItem("phone");
    if (phone) setStoredPhone(phone);
    fetchHistory();
  }, [page]);

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/wallet/transactions?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTransactions(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleProceed = async () => {
    if (!amount || Number(amount) < 1) {
      setAmountError("Minimum amount is ₹1");
      return;
    }

    if (!method) {
      alert("Please select a payment method");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/wallet/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: Number(amount),
        mobile: storedPhone,
      }),
    });

    const data = await res.json().catch(() => ({ success: false, message: "Response body corrupted" }));
    setLoading(false);

    if (!res.ok) {
      alert(data.message || "Server error occurred");
      return;
    }

    if (!data.success) {
      alert(data.message);
      return;
    }

    localStorage.setItem("pending_order", data.orderId);
    window.location.href = data.paymentUrl;
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ================= HEADER ================= */}
      <h2 className="text-2xl font-black flex items-center gap-3 tracking-tight">
        <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
          <FaWallet size={20} />
        </div>
        Wallet & Credits
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: ADD MONEY */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-md shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-60 mb-1">Available Funds</p>
            <p className="text-4xl font-black tracking-tighter">
              ₹{walletBalance}
            </p>

            <div className="h-[1px] bg-[var(--border)] w-full my-6 opacity-50" />

            <div className="space-y-5">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-[var(--muted)] opacity-80 block mb-2">Recharge Amount (INR)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg opacity-40">₹</div>
                  <input
                    type="number"
                    value={amount}
                    placeholder="Enter amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountError("");
                    }}
                    className="w-full pl-10 pr-4 py-4 rounded-2xl border bg-black/20 border-[var(--border)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all outline-none font-bold"
                  />
                </div>
                {amountError && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wider">{amountError}</p>}
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-[var(--muted)] opacity-80 block mb-3">Gateway Source</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMethod("upi")}
                    className={`p-4 rounded-2xl border transition-all flex items-center flex-col gap-2 justify-center group ${method === "upi"
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-[var(--border)] hover:bg-black/20 text-[var(--muted)]"
                      }`}
                  >
                    <FaGooglePay size={24} className={method === "upi" ? "scale-110" : "group-hover:scale-110 transition-transform"} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Instant UPI</span>
                  </button>

                  <button
                    disabled
                    className="p-4 rounded-2xl border border-[var(--border)] opacity-30 cursor-not-allowed flex items-center flex-col gap-2 justify-center text-[var(--muted)]"
                  >
                    <FaBitcoin size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Crypto Pay</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleProceed}
                disabled={loading || !method || !amount}
                className="w-full py-4 rounded-2xl bg-[var(--accent)] text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-lg shadow-[var(--accent)]/20"
              >
                {loading ? "Initializing..." : "Add Funds Now"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: HISTORY */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-md flex flex-col min-h-[480px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <FaHistory className="text-[var(--accent)]" />
                Ledger History
              </h3>
              <div className="flex gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-1.5 rounded-lg border border-[var(--border)] disabled:opacity-30"
                >
                  <FaArrowUp className="-rotate-90 text-[10px]" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-1.5 rounded-lg border border-[var(--border)] disabled:opacity-30"
                >
                  <FaArrowUp className="rotate-90 text-[10px]" />
                </button>
              </div>
            </div>

            <div className="flex-grow space-y-3">
              {loadingHistory ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-16 rounded-2xl bg-white/5 animate-pulse" />
                ))
              ) : transactions.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    {transactions.map((tx: any) => (
                      <div key={tx._id} className="p-3.5 rounded-2xl border border-[var(--border)]/50 bg-black/20 flex items-center justify-between group hover:border-[var(--accent)]/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === "credit" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                            }`}>
                            {tx.type === "credit" ? <FaArrowUp size={14} /> : <FaArrowDown size={14} />}
                          </div>
                          <div>
                            <p className="text-[11px] font-black tracking-tight leading-none mb-1">
                              {tx.category === "topup" ? "Direct Top-up" : tx.category === "order" ? "Item Purchase" : "System Mod"}
                            </p>
                            <p className="text-[9px] font-bold text-[var(--muted)] opacity-60">
                              {new Date(tx.createdAt).toLocaleDateString()} • {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-black tracking-tighter ${tx.type === "credit" ? "text-green-500" : "text-red-500"
                            }`}>
                            {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                          </p>
                          <p className="text-[8px] font-black uppercase tracking-[0.1em] text-[var(--muted)] opacity-40">
                            Final: ₹{tx.balanceAfter}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-[var(--muted)] opacity-40 space-y-2">
                  <FaHistory size={40} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">No records found</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]/20 text-center">
              <p className="text-[9px] font-bold text-[var(--muted)] opacity-50 uppercase tracking-widest">
                Displaying Page {page} of {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

