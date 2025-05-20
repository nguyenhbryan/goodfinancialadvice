import { connectDB } from "@/lib/mongodb"
import User from "@/models/User";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import Game from "@/models/Game";

export async function GET() {
    try{
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({name: session.user.name}).select("coins");
    const gamesPlayed = await Game.find({ player: user._id }).countDocuments();
    console.log(gamesPlayed);
    return NextResponse.json({coins: user.coins ?? 0, gamesPlayed: gamesPlayed ?? 0}, { status: 200 });
}
    catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}