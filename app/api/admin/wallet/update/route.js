import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import WalletTransaction from "@/models/WalletTransaction";
import jwt from "jsonwebtoken";

export async function POST(req) {
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

        /* ---------- BODY ---------- */
        const { userId, amount, action, description } = await req.json();

        if (!userId || !amount || !action) {
            return Response.json({ message: "Missing required fields" }, { status: 400 });
        }

        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return Response.json({ message: "Invalid amount" }, { status: 400 });
        }

        /* ---------- ATOMIC TRANSACTION ---------- */
        const updateQuery = action === "add"
            ? { $inc: { wallet: numAmount } }
            : { $inc: { wallet: -numAmount } };

        // For subtraction, prevent negative balance unless it's a special recovery case
        const filter = { userId };
        if (action === "subtract") {
            filter.wallet = { $gte: numAmount };
        }

        const updatedUser = await User.findOneAndUpdate(
            filter,
            updateQuery,
            { new: true }
        );

        if (!updatedUser) {
            // Check if user exists vs insufficient balance
            const checkUser = await User.findOne({ userId });
            if (!checkUser) return Response.json({ message: "User not found" }, { status: 404 });

            return Response.json({
                message: action === "subtract" ? "Operation Denied: Insufficient player balance" : "Atomic update failed"
            }, { status: 400 });
        }

        const balanceAfter = updatedUser.wallet;
        const balanceBefore = action === "add" ? balanceAfter - numAmount : balanceAfter + numAmount;

        // Create Transaction Log
        await WalletTransaction.create({
            userId: updatedUser._id.toString(),
            userEmail: updatedUser.email,
            amount: numAmount,
            type: action === "add" ? "credit" : "debit",
            category: "manual",
            description: description || `Admin ${action}ed balance`,
            balanceBefore,
            balanceAfter,
            executedBy: decoded.userId,
        });

        return Response.json({
            success: true,
            message: `Balance ${action}ed successfully`,
            newBalance: balanceAfter,
        });

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
