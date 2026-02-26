import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import WalletTransaction from "@/models/WalletTransaction";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        await connectDB();

        /* ---------- AUTH ---------- */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer "))
            return Response.json({ message: "Unauthorized" }, { status: 401 });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userType !== "owner")
            return Response.json({ message: "Forbidden" }, { status: 403 });

        /* ---------- CALCULATE STATS ---------- */
        const [totalWalletBalance, totalTransactions, todayTransactions] = await Promise.all([
            User.aggregate([{ $group: { _id: null, total: { $sum: "$wallet" } } }]),
            WalletTransaction.countDocuments(),
            WalletTransaction.countDocuments({
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            }),
        ]);

        return Response.json({
            success: true,
            stats: {
                totalPlatformWallet: totalWalletBalance[0]?.total || 0,
                totalTransactionCount: totalTransactions,
                transactionsToday: todayTransactions,
            },
        });

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
