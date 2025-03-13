"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function updateCoins(userId, amount) {
    await connectDB();
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { coins: amount } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser.coins;
    } catch (error) {
        console.error('Error incrementing coins:', error);
        throw error;
    }
}