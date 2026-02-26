import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";   // ✅ Your correct path
import User from "@/models/User";
import Order from "@/models/Order";
import WalletTransaction from "@/models/WalletTransaction";

export async function POST(req: Request) {
  try {
    await connectDB(); // 🔥 required for DB operations

    const { orderId, userId } = await req.json();

    if (!orderId || !userId) {
      return NextResponse.json(
        { success: false, message: "Missing orderId or userId" },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append("user_token", process.env.XTRA_USER_TOKEN!);
    formData.append("order_id", orderId);

    const resp = await fetch("https://xyzpay.site/api/check-order-status", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await resp.json();
    console.log("Gateway Response:", data);

    // 👤 Find order in our DB
    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found in records" });
    }

    // 🔒 Replay Protection
    if (order.status === "success") {
      return NextResponse.json({
        success: true,
        message: "Already processed",
        amount: order.price,
      });
    }

    // 💳 Gateway success logic
    const txnStatus = data?.result?.txnStatus;
    const gatewaySuccess =
      data?.status == true ||
      txnStatus == "COMPLETED" ||
      txnStatus == "SUCCESS";

    if (!gatewaySuccess) {
      return NextResponse.json({
        success: false,
        message: "Payment Pending or Failed",
      });
    }

    const amount = Number(data?.result?.amount || 0);

    // 🔒 Price Check (Critical)
    if (!amount || amount !== Number(order.price)) {
      order.status = "failed";
      order.paymentStatus = "failed";
      await order.save();
      return NextResponse.json({
        success: false,
        message: "Amount mismatch or invalid amount",
      });
    }

    // 💰 Update User Wallet (SECURE & ATOMIC)
    // Note: order.userId stores the MongoDB _id string from create-order/route.ts
    const updatedUser = await User.findOneAndUpdate(
      { _id: order.userId },
      {
        $inc: { wallet: amount, order: 1 }
      },
      { new: true } // Get the new balance after increment
    );

    if (!updatedUser) {
      console.error("User not found for ID:", order.userId);
      return NextResponse.json(
        { success: false, message: "Security Error: Wallet owner not found" },
        { status: 404 }
      );
    }

    const balanceBefore = updatedUser.wallet - amount;

    // Update order status
    order.status = "success";
    order.paymentStatus = "success";
    order.topupStatus = "success";
    order.gatewayResponse = data;
    await order.save();

    // 📝 Log Transaction
    await WalletTransaction.create({
      userId: order.userId, // Store the internal ID (Hex) for history matching
      userEmail: updatedUser.email,
      amount,
      type: "credit",
      category: "topup",
      description: `Wallet top-up via Gateway (Order: ${orderId})`,
      balanceBefore,
      balanceAfter: updatedUser.wallet,
      executedBy: "system",
    });

    return NextResponse.json({
      success: true,
      message: "Payment Successful",
      amount,
      newWallet: updatedUser.wallet,
    });
  } catch (error) {
    console.error("Check-status error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
