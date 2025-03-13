'use client'
import styles from "./page.module.css";
import Cards from "./Cards.jsx";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { userAgent } from "next/server";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const {data: session} = useSession();

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
        <Cards name="Blackjack" image="https://play-lh.googleusercontent.com/009hpXoLRxULWBEF8VsHnNTjFrOQVFKfkQfIxZcDGWtVSZEU5mKtSJyy3Zv3pxVcZQ" href="games\blackjack"/>
        <Cards name="Plinko" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDs3AioTT6XtxOS1nwXtmcrSR4Rh5xWZ2E0g&s" />
        <Cards name="Plinko" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDs3AioTT6XtxOS1nwXtmcrSR4Rh5xWZ2E0g&s" />
        
      </div>
    </div>
  );
}
