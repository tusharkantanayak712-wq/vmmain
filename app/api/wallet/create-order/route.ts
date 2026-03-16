import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { FEATURE_FLAGS } from "@/lib/config";
import SystemSettings from "@/models/SystemSettings";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. Check Feature Flag (DB First, with Static Fallback)
    const settings = await SystemSettings.findOne().lean();
    const isEnabled = settings?.walletAddEnabled ?? FEATURE_FLAGS.WALLET_ADD;

    if (!isEnabled) {
      return NextResponse.json({ success: false, message: "Wallet top-up is temporarily disabled" }, { status: 403 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const userId = decoded.userId;
    const { amount, mobile: reqMobile } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ success: false, message: "Minimum amount ₹1" });
    }

    // 👤 Fetch User Details for fallback info
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const finalMobile = reqMobile || user.phone || "0000000000";
    const finalEmail = user.email || "";

    const orderId = "WLT_" + Date.now(); // unique

    // Save order to DB first
    await Order.create({
      orderId,
      userId,
      gameSlug: "wallet",
      itemSlug: "wallet-topup",
      itemName: `Wallet Topup (₹${amount})`,
      price: Number(amount),
      phone: finalMobile,
      email: finalEmail,
      paymentMethod: "upi",
      status: "pending",
      paymentStatus: "pending",
    });

    const formData = new URLSearchParams();
    formData.append("customer_mobile", finalMobile);
    formData.append("user_token", process.env.XTRA_USER_TOKEN!);
    formData.append("amount", amount.toString());
    formData.append("order_id", orderId);

    // Fixed typo: NEXT_PUBLIC_BASE_URL instead of BASE_URLU
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_BASE_URLU || "https://vamp.site";
    formData.append("redirect_url", `${baseUrl}/wallet/payment-complete`);

    formData.append("remark1", "wallet-topup");
    formData.append("remark2", "upi");

    const resp = await fetch("https://chuimei-pe.in/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    // Check if response is okay
    if (!resp.ok) {
      return NextResponse.json({ success: false, message: "Payment gateway currently offline" }, { status: 502 });
    }

    const data = await resp.json();

    if (!data.status) {
      return NextResponse.json({ success: false, message: data.message });
    }

    return NextResponse.json({
      success: true,
      paymentUrl: data.result.payment_url,
      orderId: orderId,
    });
  } catch (error: any) {
    console.error("Wallet Create Order Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error during order creation. Please try again later."
    }, { status: 500 });
  }
}
