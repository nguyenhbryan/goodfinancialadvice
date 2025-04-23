"use server";
import { connectDB } from "@/lib/mongodb";
import Game from "@/models/Game";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { updateCoins } from "@/actions/updateCoins";
import { calculateMultiplier } from "@/lib/games/mines/handlers";

export async function POST(req) {
    try {
        // Check if the user is authenticated
        const session = await getServerSession();
        console.log("Session:", session);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        if (session.user.coins < body.betAmt) {
            return NextResponse.json({ error: "Insufficient coins" }, { status: 400 });
        }
        await connectDB();


        updateCoins(session.user.name, -body.betAmt);
        if (!body.name) {
            return NextResponse.json({ error: "Game name is required" }, { status: 400 });
        }
        const bombPositions = () => {
            const positions = new Set();
            while (positions.size < body.bombNumber) {
                const randomPosition = Math.floor(Math.random() * 24);
                positions.add(randomPosition);
            }
            return Array.from(positions);
        };

        const bombs = bombPositions();

        // Create a new game document
        const game = new Game({ 
            id: uuidv4(), 
            name: body.name, 
            player: session.user.id, 
            bombPositions: bombs,
            totalTiles: body.totalTiles,
            betAmount: body.betAmt,
        });
        await game.save();


        return NextResponse.json({ status: 201 });
    } catch (e) {
        console.error("❌ Server Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        await connectDB();

        // Fetch the current game
        const currentGame = await Game.findOne({player: session.user.id}).sort({ createdAt: -1 });
        if (!currentGame) {
            return NextResponse.json({ error: "No game found" }, { status: 404 });
        }

        if (body.endGame === true) {
            // Update the game state to game over
            currentGame.gameOver = true;
            await currentGame.save();
            return NextResponse.json({bombPositions: currentGame.bombPositions, winnings: currentGame.winnings},{ status: 200  });
        }

        // Check if the clicked index is a bomb
        const bombPositions = currentGame.bombPositions;
        if (bombPositions.includes(body.index)) {
            // Update the game state to game over
            currentGame.gameOver = true;
            currentGame.winnings = 0;
            // Update the player's coins
            await currentGame.save();
            return NextResponse.json({ hit: "bomb", bombPositions }, { status: 200 });
        } else {
            // Update the game state to safe click
            currentGame.safeClicks += 1;
            const multiplier = calculateMultiplier(currentGame.totalTiles, currentGame.bombPositions.length, currentGame.safeClicks);
            currentGame.winnings = multiplier * currentGame.betAmount;
            await currentGame.save();
            
            return NextResponse.json({ hit: "gem", multi: multiplier }, { status: 200 });
        }
    } catch (e) {
        console.error("❌ Server Error:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
