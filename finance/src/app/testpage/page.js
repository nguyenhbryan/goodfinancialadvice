'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Leaderboard from "./leaderboard";

export default function TestPage() {
  const [coins, setCoins] = useState(0);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch the coins from the server
    fetch(`/api/users/${session?.user?.id}`)
      .then((res) => res.json()
      .then((data) => setCoins(data.coins)))
      console.log("Coins from server:", coins);
      setLoading(false);

    
  }
    , []);

  return (
    <>
      <h1>Test page for api</h1>
      <div>
        {loading ? "Loading..." : `Coin balance from SERVER: ${coins}`}
      </div>
    </>
  );
}