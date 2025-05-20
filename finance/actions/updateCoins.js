"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function updateCoins(username, amount) {
    await connectDB();
    try {
        // Increment the coins using Mongoose's $inc operator
        const user = await User.findOne({ name: username });
        if (!user) {
            throw new Error('User not found', username);
        }
        if (user.coins + amount < 0) {
            throw new Error('Insufficient coins');
        }
        const updatedUser = await User.findOneAndUpdate(
            { name: username },
            { $inc: { coins: amount } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found', userId);
        }

        return updatedUser.coins;
    } catch (error) {
        console.error('Error incrementing coins:', error);
        throw error;
    }
}