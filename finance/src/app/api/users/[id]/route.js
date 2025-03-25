import { connectDB } from "@/lib/mongodb"
import User from "@/models/User";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try{
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("Session data:", session);
    
    const user = await User.findById(session?.user?.id).select("coins");
    return NextResponse.json({coins: user.coins ?? 0});
}
    catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}