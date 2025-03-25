"use client";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./page.module.css"; // Assuming styles will be used later
import Link from "next/link"; // Assuming Link will be used later
import GameBoard from "./gameboard"; // Assuming GameBoard is in the same directory

const TOTAL_TILES = 24;
const MIN_BET = 0.01;

export default function Mines() {
    const [bombCount, setBombCount] = useState("4");
    const [betAmount, setBetAmount] = useState("10");
    const [currentWinnings, setCurrentWinnings] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [gameState, setGameState] = useState(Array(TOTAL_TILES).fill("hidden"));

    const calculateProbability = useCallback((safeClicks) => {
        const safeTiles = TOTAL_TILES - parseInt(bombCount);
        const totalTiles = TOTAL_TILES;
        const probability = (safeTiles + 2) / totalTiles;
        return probability;
    }, [bombCount]);

    const calculatePayout = useCallback((safeClicks) => {
        let payout = parseFloat(betAmount);
        for (let i = 0; i < safeClicks; i++) {
            payout /= calculateProbability(i);
        };
        return payout;
    }, [betAmount, calculateProbability]);

    const handleSafeClick = useCallback((newClickCount) => {
        setClickCount(newClickCount);
        const newWinings = calculatePayout(newClickCount);
        setCurrentWinnings(newWinings);
    }, [calculatePayout]);

    const handleGameOver = useCallback((isHomeRun) => {
        setGameOver(true);
        if (!isHomeRun) {
            setCurrentWinnings(0);
        }
        setIsGameStarted(false);
    }, []);

    const handleStartGame = useCallback(() => {
        const bombCountNum = parseInt(bombCount);
        const betAmountNum = parseFloat(betAmount);

        if (
            isNaN(bombCountNum) ||
            bombCountNum < 1 ||
            bombCountNum >= TOTAL_TILES
        ) {
            alert("Invalid bomb count. Please enter a number between 1 and 23.");
            return;
        }

        if (isNaN(betAmountNum) || betAmountNum <= 0) {
            alert("Invalid bet amount. Please enter a positive number.");
            return;
        }

        setIsGameStarted(true);
        setGameOver(false);
        setCurrentWinnings(0);
        setClickCount(0);
        // Reset the game board state to avoid initial gap
        setGameState(Array(TOTAL_TILES).fill("hidden"));
    }, [bombCount, betAmount]);

    const handleCashout = () => {
        if (currentWinnings > parseFloat(betAmount)) {
            setGameOver(true);
            setIsGameStarted(false);
            alert(`You cashed out with a payout of ${currentWinnings.toFixed(2)}`);
        };
    }

    const handleBombCountChange = (event) => {
        setBombCount(event.target.value);
    };

    const handleBetAmountChange = (event) => {
        setBetAmount(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.sidebar}>
                    <h2 className={styles.settings}>Game Settings</h2>
                    <div className={styles.settingsContainer}>
                        <div>
                            <div>
                                <label htmlFor="betAmount" className={styles.label}>
                                    Bet Amount (min: {MIN_BET}):
                                </label>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    id="betAmount"
                                    value={betAmount}
                                    onChange={handleBetAmountChange}
                                    className={styles.input}
                                    min={MIN_BET}
                                    step="0.01"
                                    disabled={isGameStarted}
                                />
                            </div>
                            <div>
                                <label htmlFor="bombCount" className={styles.label}>
                                    Bombs
                                </label>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    id="bombCount"
                                    value={bombCount}
                                    onChange={handleBombCountChange}
                                    className={styles.input}
                                    min="1"
                                    max="23"
                                    disabled={isGameStarted}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleStartGame}
                            className={`${styles.button} ${styles.startButton}`}
                            disabled={isGameStarted}
                        >
                            {isGameStarted ? "Game In Progress" : "Play"}
                        </button>
                        <button
                            onClick={handleCashout}
                            className={`${styles.button} ${styles.cashoutButton}`}
                            disabled={!isGameStarted || currentWinnings <= parseFloat(betAmount)}
                        >
                            Cash Out
                        </button>
                    </div>
                </div>
                <div className={styles.gameContainer}>
                    <div className={styles.game}>
                        <GameBoard
                            bombCount={parseInt(bombCount)}
                            onSafeClick={handleSafeClick}
                            onGameOver={handleGameOver}
                            isGameStarted={isGameStarted}
                            currentWinnings={currentWinnings} // Pass currentWinnings as a prop
                            gameOver={gameOver} // Pass gameOver as a prop
                        />
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.gameInfo}>
                    <h1>What is Mines?</h1>
                    <p>
                        Mines is a thrilling game of chance where players bet an amount and try to uncover safe tiles on a game board without hitting a bomb.
                        The game starts with a set number of bombs hidden among the tiles. Each safe tile you uncover increases your potential winnings,
                        but hitting a bomb ends the game and you lose your bet. You can cash out at any time to secure your winnings.
                    </p>
                    <h1>How to Play the Mines Game</h1>
                    <h2>Objective</h2>
                    <p>
                        Set your bet amount and the number of bombs on the game board.
                    </p>
                    <p>
                        Click on tiles to uncover them. Each tile you uncover increases your potential winnings.
                    </p>
                    <p>
                        If you hit a bomb, the game is over and you lose your bet.
                    </p>
                    <p>
                        You can cash out at any time to secure your winnings.
                    </p>
                    <p>
                        The goal is to uncover as many safe tiles as possible without hitting a bomb.
                    </p>
                </div>
            </div>
        </div>
    );
}