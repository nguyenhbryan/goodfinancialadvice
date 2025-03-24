import { useState, useEffect } from "react";
import styles from "./gameboard.module.css"; // Assuming styles will be used later

export default function GameBoard({ bombCount, onSafeClick, onGameOver, isGameStarted, currentWinnings, gameOver }) {
  const [gameState, setGameState] = useState(Array(24).fill("hidden"));
  const [bombPositions, setBombPositions] = useState(new Set());
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (isGameStarted) {
      initializeGame();
    }
  }, [isGameStarted, bombCount]);

  const initializeGame = () => {
    const newGameState = Array(24).fill("hidden");
    const newBombPositions = new Set();
    while (newBombPositions.size < bombCount) {
      newBombPositions.add(Math.floor(Math.random() * 24));
    }
    setGameState(newGameState);
    setBombPositions(newBombPositions);
    setClickCount(0);
  };

  const handleCircleClick = (index) => {
    if (gameState[index] !== "hidden" || !isGameStarted) return;

    const newGameState = [...gameState];
    if (bombPositions.has(index)) {
      newGameState[index] = "bomb";
      setGameState(newGameState);
      onGameOver(false);
    } else {
      newGameState[index] = "gem";
      setGameState(newGameState);
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);
      onSafeClick(newClickCount);

      if (newClickCount === 24 - bombCount) {
        onGameOver(true);
      }
    }
  };

  useEffect(() => {
    if (!isGameStarted) {
      const finalGameState = [...gameState];
      bombPositions.forEach((pos) => {
        finalGameState[pos] = "bomb";
      });
      setGameState(finalGameState);
    }
  }, [isGameStarted, bombPositions]);

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
        <div>Current Winnings: ${currentWinnings.toFixed(2)}</div>
        {gameOver && currentWinnings === 0 && (
          <div className={styles.gameOver}>
            Game Over! You lost your bet.
          </div>
        )}
        {gameOver && currentWinnings > 0 && (
          <div className={styles.gameOver}>
            Game Over! You cashed out with ${currentWinnings.toFixed(2)}.
          </div>
        )}
      </div>
    </div>
  );
}
