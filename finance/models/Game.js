import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const GameSchema = new Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    player: {
        type: String,
        default: null // Explicitly set the default value
    },
    name: {
        type: String,
        required: true
    },
    bombPositions: {
        type: Array,
        required: true
    },
    totalTiles: {
        type: Number,
        required: true
    },
    safeClicks: {
        type: Number,
        default: 0 // Explicitly set the default value
    },
    betAmount: {
        type: Number,
        default: 0 // Explicitly set the default value
    },
    winnings: {
        type: Number,
        default: 0
    },
    gameOver: {
        type: Boolean,
        default: false // Explicitly set the default value
    },
    createdAt: {
        type: Date,
        default: Date.now // Explicitly set the default value
    },
    updatedAt: {
        type: Date,
        default: Date.now // Explicitly set the default value
    },
}, {
    timestamps: true
});

const Game = mongoose.models?.Game || model('Game', GameSchema);

export default Game;
