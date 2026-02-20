import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        await connectDB();

        /* ================= AUTH ================= */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer "))
            return Response.json({ message: "Unauthorized" }, { status: 401 });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userType !== "owner" && decoded.userType !== "admin")
            return Response.json({ message: "Forbidden" }, { status: 403 });

        /* ================= DATES ================= */
        const now = new Date();

        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(now.getDate() - 1);

        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);

        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);

        /* ================= AGGREGATION ================= */
        // Helper function to get totals
        const getStats = async (dateGte) => {
            const result = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: dateGte },
                        // Optional: Consider if only successful orders should be counted
                        // status: { $in: ["success", "SUCCESS"] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalCount: { $sum: 1 },
                        totalValue: { $sum: "$price" }
                    }
                }
            ]);

            return result[0] || { totalCount: 0, totalValue: 0 };
        };

        const [stats1d, stats7d, stats30d] = await Promise.all([
            getStats(oneDayAgo),
            getStats(sevenDaysAgo),
            getStats(thirtyDaysAgo)
        ]);

        /* ================= RESPONSE ================= */
        return Response.json({
            success: true,
            data: {
                totalOrders: {
                    "1d": stats1d.totalCount,
                    "7d": stats7d.totalCount,
                    "30d": stats30d.totalCount
                },
                totalValue: {
                    "1d": stats1d.totalValue,
                    "7d": stats7d.totalValue,
                    "30d": stats30d.totalValue
                }
            }
        });

    } catch (err) {
        console.error("Order Stats Error:", err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
