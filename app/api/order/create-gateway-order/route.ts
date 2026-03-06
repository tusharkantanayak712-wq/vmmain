import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import WalletTransaction from "@/models/WalletTransaction";
import PricingConfig from "@/models/PricingConfig";
import crypto from "crypto";
import { FEATURE_FLAGS } from "@/lib/config";

/* =====================================================
   TYPES
===================================================== */

type MembershipConfig = {
  items: Record<string, number>;
};

type OTTConfig = Record<string, number>;

/* =====================================================
   STATIC PRICING (SERVER TRUSTED)
===================================================== */

const MEMBERSHIPS: Record<string, { items: Record<string, { price: number; name: string }> }> = {
  "silver-membership": {
    items: {
      "silver-1m": { price: 99, name: "Silver Membership (1 Month)" },
      "silver-3m": { price: 299, name: "Silver Membership (3 Months)" },
    },
  },
  "reseller-membership": {
    items: {
      "reseller-1m": { price: 199, name: "Reseller Membership (1 Month)" },
      "reseller-3m": { price: 499, name: "Reseller Membership (3 Months)" },
    },
  },
};

const OTTS: Record<string, Record<string, { price: number; name: string }>> = {
  "youtube-premium": {
    "yt-1m": { price: 30, name: "YouTube Premium (1 Month)" },
    "yt-3m": { price: 90, name: "YouTube Premium (3 Months)" },
  },
  netflix: {
    "nf-1m": { price: 99, name: "Netflix Premium (1 Month)" },
    "nf-3m": { price: 249, name: "Netflix Premium (3 Months)" },
  },
  instagram: {
    "ig-1k": { price: 249, name: "Instagram Followers (1K)" },
    "ig-5k": { price: 1099, name: "Instagram Followers (5K)" },
  },
};

/* =====================================================
   PRICE RESOLVER
===================================================== */

async function resolveItemData(
  gameSlug: string,
  itemSlug: string,
  userType: string
): Promise<{ price: number; itemName: string }> {
  // MEMBERSHIPS
  if (MEMBERSHIPS[gameSlug]) {
    const item = MEMBERSHIPS[gameSlug].items[itemSlug];
    if (!item) throw new Error("Invalid membership item");
    return { price: item.price, itemName: item.name };
  }

  // OTTS
  if (OTTS[gameSlug]) {
    const item = OTTS[gameSlug][itemSlug];
    if (!item) throw new Error("Invalid OTT item");
    return { price: item.price, itemName: item.name };
  }

  // GAMES
  const resp = await fetch(
    `https://game-off-ten.vercel.app/api/v1/game/${gameSlug}`,
    {
      headers: {
        "x-api-key": process.env.API_SECRET_KEY!,
      },
    }
  );

  const data = await resp.json();
  if (!data?.data?.itemId) throw new Error("Game not found");

  const baseItem = data.data.itemId.find(
    (i: any) => i.itemSlug === itemSlug
  );

  if (!baseItem) throw new Error("Invalid game item");

  let price = Number(baseItem.sellingPrice);
  const itemName = baseItem.itemName;

  if (userType !== "owner") {
    await connectDB();
    const pricingConfig = await PricingConfig.findOne({ userType }).lean();

    if (pricingConfig) {
      const fixed = pricingConfig.overrides?.find(
        (o: any) =>
          o.gameSlug === gameSlug && o.itemSlug === itemSlug
      );

      if (fixed?.fixedPrice != null) {
        price = Number(fixed.fixedPrice);
      } else if (pricingConfig.slabs?.length) {
        const slab = pricingConfig.slabs.find(
          (s: any) => price >= s.min && price < s.max
        );
        if (slab) price = price * (1 + slab.percent / 100);
      }
    }
  }

  return { price: Math.ceil(price), itemName };
}

/* =====================================================
   CREATE ORDER API
===================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    /* ---------- AUTH (JWT) ---------- */
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(
        authHeader.split(" ")[1],
        process.env.JWT_SECRET!
      );
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userId = decoded.userId || null;
    const userType = decoded.userType || "user";

    /* ---------- BODY ---------- */
    const body = await req.json();

    const {
      gameSlug,
      itemSlug,
      itemName,
      playerId,
      zoneId,
      paymentMethod,
      email,
      phone,
      currency = "INR",
    } = body;

    if (
      !gameSlug ||
      !itemSlug ||
      !playerId ||
      !zoneId ||
      !paymentMethod
    ) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Provide email or phone",
      });
    }

    /* ---------- SERVER DATA RESOLVER (SECURE) ---------- */
    const { price, itemName: resolvedItemName } = await resolveItemData(gameSlug, itemSlug, userType);

    /* ---------- ORDER ID ---------- */
    const orderId =
      "TOPUP_" +
      Date.now().toString(36) +
      "_" +
      crypto.randomBytes(8).toString("hex");

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    /* ---------- CREATE ORDER ---------- */
    const newOrder = await Order.create({
      orderId,
      userId,
      gameSlug,
      itemSlug,
      itemName: resolvedItemName,
      playerId,
      zoneId,
      paymentMethod,
      price,
      email: email || null,
      phone: phone || null,
      currency,
      status: "pending",
      paymentStatus: "pending",
      topupStatus: "pending",
      expiresAt,
    });

    /* ---------- WALLET PAYMENT (SECURE & ATOMIC) ---------- */
    if (paymentMethod === "wallet") {
      if (!FEATURE_FLAGS.WALLET_PURCHASE) {
        return NextResponse.json({
          success: false,
          message: "Wallet purchase is temporarily disabled",
        }, { status: 403 });
      }

      // 🔒 Atomic Balance Check & Deduction
      // We find the user AND check their balance in a single MongoDB operation
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: userId,
          wallet: { $gte: price }
        },
        {
          $inc: { wallet: -price, order: 1 }
        },
        {
          new: false // Return the user state BEFORE deduction for logging
        }
      );

      if (!updatedUser) {
        // Check if user exists at all
        const userExists = await User.findById(userId);
        if (!userExists) {
          return NextResponse.json({ success: false, message: "Security Error: Identity not found" }, { status: 404 });
        }

        return NextResponse.json({
          success: false,
          message: "Transaction Aborted: Insufficient wallet balance or concurrent operation mismatch",
        });
      }

      const balanceBefore = updatedUser.wallet || 0;

      // 📝 Log Transaction
      await WalletTransaction.create({
        userId: updatedUser._id.toString(),
        userEmail: updatedUser.email,
        amount: price,
        type: "debit",
        category: "order",
        description: `Order Payment: ${resolvedItemName} (ID: ${orderId})`,
        balanceBefore,
        balanceAfter: balanceBefore - price,
        executedBy: "system",
      });

      // Mark order as paid
      newOrder.paymentStatus = "success";
      await newOrder.save();

      return NextResponse.json({
        success: true,
        orderId,
        message: "Payment verified and recorded. Processing top-up...",
      });
    }

    /* ---------- PAYMENT GATEWAY ---------- */
    const formData = new URLSearchParams();
    if (phone) formData.append("customer_mobile", phone);
    formData.append("user_token", process.env.XTRA_USER_TOKEN!);
    formData.append("amount", String(price));
    formData.append("order_id", orderId);
    formData.append(
      "redirect_url",
      `${process.env.NEXT_PUBLIC_BASE_URLU}/payment/topup-complete`
    );

    const resp = await fetch("https://xyzpay.site/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await resp.json();

    if (!data?.status) {
      return NextResponse.json({
        success: false,
        message: "Payment gateway error",
      });
    }

    newOrder.gatewayOrderId = data.result.orderId;
    await newOrder.save();

    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl: data.result.payment_url,
    });
  } catch (err: any) {
    console.error("CREATE ORDER ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
