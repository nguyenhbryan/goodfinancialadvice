"use client";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./page.module.css"; // Assuming styles will be used later
import Link from "next/link"; // Assuming Link will be used later
import GameBoard from "./gameboard"; // Assuming GameBoard is in the same directory
import { useSession } from "next-auth/react";

const TOTAL_TILES = 24;
const MIN_BET = 0.01;

export default function Mines() {
    const [bombCount, setBombCount] = useState("4");
    const [betAmount, setBetAmount] = useState("10");
    const [currentWinnings, setCurrentWinnings] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const { data: session, status } = useSession();
    const [coins, setCoins] = useState(0);
    const [cashedOut, setCashedOut] = useState(false);


    const loginOverlay = () => {
        if (status === "unauthenticated") {
            console.log("User is not authenticated");
            return (
                <div className={styles.loginOverlay}>
                    <div className={styles.loginOverlayContent}>
                        <h2 className={styles.loginOverlayTitle}>Login to Play</h2>
                        <p className={styles.loginOverlayText}>Please login to play the game.</p>
                        <Link href="/login" className={styles.loginOverlayButton}>
                            Login
                        </Link>
                    </div>
                </div>
            );
        }
        return null;
    };


    const handleGameOver = useCallback((isHomeRun) => {
        setGameOver(true);
        if (!isHomeRun) {

            setCurrentWinnings(0);
        }
        setIsGameStarted(false);
    }, []);
    const createGame = async () => {

        try {
            const response = await fetch("/api/mines", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: 0, name: "Mines", bombNumber: parseInt(bombCount), totalTiles: TOTAL_TILES, betAmt: parseFloat(betAmount) }),
            });

            if (!response.ok) {
                throw new Error("Failed to create game");
            }

        } catch (error) {
            console.error(error);
        }
        setIsGameStarted(true);
        setCashedOut(false);
        setGameOver(false);
    };


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
        
        createGame();
        // Reset the game board state to avoid initial gap
    }, [bombCount, betAmount]);



    const handleBombCountChange = (event) => {
        setBombCount(event.target.value);
    };

    const handleBetAmountChange = (event) => {
        setBetAmount(event.target.value);
    };

    useEffect(() => {
        if (isGameStarted || gameOver) {
            fetch(`/api/users/${session?.user?.id}`)
                .then((res) => res.json())
                .then((data) => setCoins(data.coins.toFixed(2)));
        }
    }, [isGameStarted, gameOver, session?.user?.id]);

    useEffect(() => {
        fetch(`/api/users/${session?.user?.id}`).then((res) => res.json()).then((data) => setCoins(data.coins.toFixed(2)));
    }, []);


    return (
        <div className={styles.container}>
            {loginOverlay()}
            <div className={styles.top}>
                <div className={styles.sidebar}>
                    <h2 className={styles.settings}>Game Settings</h2>
                    <div className={styles.settingsContainer}>
                        <div>
                            <div>
                                <label htmlFor="betAmount" className={styles.label}>
                                    Bet Amount (min: {MIN_BET}):
                                </label>
                                <p>coins: {coins}</p>
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
                                    disabled={isGameStarted} // Disable input if game is started and user is authenticated
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
                            disabled={isGameStarted || status !== "authenticated"}
                        >
                            {isGameStarted ? "Game In Progress" : "Play"}
                        </button>
                        <button
                            onClick={() => {
                                setCashedOut(true);
                                setIsGameStarted(false);
                            }}
                            className={`${styles.button} ${styles.cashoutButton}`}
                            //disabled={!isGameStarted || currentWinnings <= parseFloat(betAmount) || status.status !== "authenticated"}
                        >
                            Cash Out
                        </button>
                    </div>
                </div>
                <div className={styles.gameContainer}>
                    <div className={styles.game}>
                        <GameBoard
                            bombCount={parseInt(bombCount)}
                            onGameOver={handleGameOver}
                            isGameStarted={isGameStarted}
                            gameOver={gameOver} // Pass gameOver as a prop
                            onCashout={cashedOut}
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