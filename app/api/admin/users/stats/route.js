import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
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
        // Using Promise.all for parallel queries
        const [
            new1d, new7d, new30d,
            active1d, active7d, active30d
        ] = await Promise.all([
            User.countDocuments({ createdAt: { $gte: oneDayAgo } }),
            User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
            User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),

            User.countDocuments({ lastLogin: { $gte: oneDayAgo } }),
            User.countDocuments({ lastLogin: { $gte: sevenDaysAgo } }),
            User.countDocuments({ lastLogin: { $gte: thirtyDaysAgo } })
        ]);

        /* ================= RESPONSE ================= */
        return Response.json({
            success: true,
            data: {
                newUsers: {
                    "1d": new1d,
                    "7d": new7d,
                    "30d": new30d
                },
                activeUsers: {
                    "1d": active1d,
                    "7d": active7d,
                    "30d": active30d
                }
            }
        });

    } catch (err) {
        console.error("User Stats Error:", err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
