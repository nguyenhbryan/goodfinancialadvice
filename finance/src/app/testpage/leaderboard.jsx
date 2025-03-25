'use client'
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://turbo-space-lamp-9vqr4qw7x57hp4q-3000.app.github.dev/");

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Request leaderboard on mount
    socket.emit("requestLeaderboard");

    // Listen for real-time updates
    socket.on("updateLeaderboard", (data) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off("updateLeaderboard");
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">🏆 Leaderboard</h2>
      <ul className="mt-4">
        {leaderboard.map((player, index) => (
          <li key={index} className="p-2 border-b">
            {index + 1}. {player.username} - {player.coins} 🪙
          </li>
        ))}
      </ul>
    </div>
  );
}
