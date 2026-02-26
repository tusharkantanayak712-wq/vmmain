import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SystemSettings from "@/models/SystemSettings";
import jwt from "jsonwebtoken";

const ownerOnly = async (req) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return false;
    try {
        const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        return decoded.userType === "owner";
    } catch {
        return false;
    }
};

export async function GET(req) {
    try {
        await connectDB();
        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = await SystemSettings.create({ maintenanceMode: false });
        }
        return NextResponse.json({ success: true, settings });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        if (!(await ownerOnly(req))) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { maintenanceMode } = await req.json();

        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = new SystemSettings({ maintenanceMode });
        } else {
            settings.maintenanceMode = maintenanceMode;
        }
        await settings.save();

        return NextResponse.json({ success: true, settings });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
