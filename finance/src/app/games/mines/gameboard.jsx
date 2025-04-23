import { useState, useEffect } from "react";
import styles from "./gameboard.module.css"; // Assuming styles will be used later
import { useSession } from "next-auth/react";


export default function GameBoard({ onSafeClick, onGameOver, isGameStarted, gameOver, onCashout }) {
  const [gameState, setGameState] = useState(Array(24).fill("hidden"));
  const [isGameOver, setIsGameOver] = useState(false);
  const { data: session } = useSession();


  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [currentWinnings, setCurrentWinnings] = useState(0);

  const cashOut = async () => {
    try {
      const response = await fetch("/api/mines", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endGame: true }),
      }

      );
      if (!response.ok) {
        throw new Error("Failed to cash out");
      }

      const data = await response.json();
      const newGameState = [...gameState];
      const bombPositions = data.bombPositions || []; 
      const winnings = data.winnings || 0;
      setCurrentWinnings(winnings.toFixed(2));
      bombPositions.forEach((pos) => {
        newGameState[pos] = "bomb";
      });
      setGameState(newGameState);
      onGameOver(true);
      setIsGameOver(true);

    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isGameStarted) {
      setGameState(Array(24).fill("hidden"));
    }
  }, [isGameStarted]);

  useEffect(() => {
    if (onCashout) {
      cashOut();
    }
  }, [onCashout]);

  const handleCircleClick = async (index) => {
    if (gameState[index] !== "hidden" || isGameOver) return;

    try {
      const response = await fetch("/api/mines", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate tile");
      }

      const data = await response.json();
      const newGameState = [...gameState];
      const bombPositions = data.bombPositions || []; // Ensure bombPositions is defined

      if (data.hit === "bomb") {
        bombPositions.forEach((pos) => {
          newGameState[pos] = "bomb";
        });
        setGameState(newGameState);
        setCurrentMultiplier(0);
        onGameOver(true);
      } else {
        newGameState[index] = "gem";
        setGameState(newGameState);

        setCurrentMultiplier(data.multi.toFixed(2));
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameboard}>
        {gameState.map((state, index) => (
          <div
            key={index}
            className={`${styles.circle} ${styles[state]}`}
            onClick={() => handleCircleClick(index)}
          >
            {state === "gem" && <span className={styles.gem}>💎</span>}
            {state === "bomb" && <span className={styles.bomb}>💣</span>}
          </div>
        ))}
      </div>
      <div className={styles.gameInfo}>
        <div>Current Multiplier: {currentMultiplier}x</div>
        {gameOver && currentWinnings === 0 && (
          <div className={styles.gameOver}>
            Game Over! You lost your bet.
          </div>
        )}
        {gameOver && currentWinnings > 0 && (
          <div className={styles.gameOver}>
            Game Over! You cashed out with ${currentWinnings}.
          </div>
        )}
      </div>
    </div>
  );
}
