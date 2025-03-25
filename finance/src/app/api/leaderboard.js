import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // Get top 10 players sorted by coins
    const topPlayers = await User.find()
      .sort({ coins: -1 }) // Descending order
      .limit(10)
      .select("username coins"); // Select only needed fields

    return NextResponse.json({ leaderboard: topPlayers });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
