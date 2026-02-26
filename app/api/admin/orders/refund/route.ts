import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import WalletTransaction from "@/models/WalletTransaction";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        await connectDB();

        /* ---------- AUTH ---------- */
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET!);
        } catch {
            return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }

        if (decoded.userType !== "owner" && decoded.role !== "owner") {
            return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
        }

        const { orderId } = await req.json();
        if (!orderId) {
            return NextResponse.json({ success: false, message: "Missing orderId" }, { status: 400 });
        }

        /* ---------- FIND ORDER ---------- */
        const order = await Order.findOne({ orderId });
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        // 🔒 Security Checks
        if (order.status === "refunded" || order.status === "REFUND") {
            return NextResponse.json({ success: false, message: "Order already refunded" }, { status: 400 });
        }

        if (order.paymentStatus !== "success") {
            return NextResponse.json({ success: false, message: "Can only refund successful payments" }, { status: 400 });
        }

        /* ---------- ATOMIC REFUND ---------- */
        // 1. Credit the user atomically
        const updatedUser = await User.findOneAndUpdate(
            { userId: order.userId },
            { $inc: { wallet: order.price } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found for refund" }, { status: 404 });
        }

        // 2. Update Order Status
        const oldStatus = order.status;
        order.status = "refunded";
        order.paymentStatus = "refunded";
        await order.save();

        // 3. Log Wallet Transaction
        await WalletTransaction.create({
            userId: updatedUser.userId,
            userEmail: updatedUser.email,
            amount: order.price,
            type: "credit",
            category: "refund",
            description: `Refund for Order: ${order.itemName} (${orderId}). Original Status: ${oldStatus}`,
            balanceBefore: updatedUser.wallet - order.price,
            balanceAfter: updatedUser.wallet,
            executedBy: decoded.userId,
        });

        return NextResponse.json({
            success: true,
            message: "Order refunded successfully",
            newBalance: updatedUser.wallet,
        });
    } catch (error: any) {
        console.error("REFUND ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
