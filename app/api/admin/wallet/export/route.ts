import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WalletTransaction from "@/models/WalletTransaction";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
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

        /* ---------- FETCH ALL DATA ---------- */
        const transactions = await WalletTransaction.find({}).sort({ createdAt: -1 }).lean();

        /* ---------- GENERATE CSV ---------- */
        const headers = [
            "Timestamp",
            "User ID",
            "User Email",
            "Type",
            "Category",
            "Amount",
            "Balance Before",
            "Balance After",
            "Description",
            "Executed By",
        ];

        const rows = transactions.map((t) => [
            new Date(t.createdAt).toLocaleString(),
            t.userId,
            t.userEmail,
            t.type,
            t.category,
            t.amount,
            t.balanceBefore,
            t.balanceAfter,
            `"${t.description.replace(/"/g, '""')}"`,
            t.executedBy,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(",")),
        ].join("\n");

        return new NextResponse(csvContent, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename=wallet_ledger_${new Date().toISOString().split("T")[0]}.csv`,
            },
        });
    } catch (error: any) {
        console.error("EXPORT ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
