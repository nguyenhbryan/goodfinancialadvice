'use client'
import styles from "./page.module.css";
import Cards from "./Cards.jsx";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { userAgent } from "next/server";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.body}>
      <div className={styles.welcome_container}>
        <div className={styles.welcome_left}>
          <div>
            Welcome {session?.user?.name}
          </div>
          <div>
            Coins: {session?.user?.coins}
          </div>
          <div>
            Wager
          </div>
          <div>
            Profit
          </div>
        </div>
        <div className={styles.welcome_right}>
          Placement
        </div>
      </div>
      <div className={styles.recommended_games}>
        <div className={styles.recommended_header}>
          <h1>Trending Games</h1>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </div>
        <div className={styles.cards_container}>
          <Cards name="Slots" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" href="games/slots" />
          <Cards name="Blackjack" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" href="games/blackjack" />
          <Cards name="Plinko" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          <Cards name="Crash" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          <Cards name="Roulette" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          <Cards name="Dice" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          <Cards name="Mines" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          <Cards name="Keno" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
        </div>
      </div>
    </div>
  );
}
