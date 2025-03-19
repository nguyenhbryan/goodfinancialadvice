'use client'
import { useEffect } from "react";
import styles from "./page.module.css";
import Cards from "./Cards.jsx";
import { useSession } from "next-auth/react";
import Sidebar from "./components/Sidebar";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.show);
        } else {
          entry.target.classList.remove(styles.show);
        }
      });
    });

    const hiddenElements = document.querySelectorAll(`.${styles.hidden}`);
    hiddenElements.forEach((el) => {
      observer.observe(el);
    });

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.cards_show);
        } else {
          entry.target.classList.remove(styles.cards_show);
        }
      });
    });

    const cardElements = document.querySelectorAll(`.${styles.cards_hidden}`);
    cardElements.forEach((el) => {
      cardObserver.observe(el);
    });

    return () => {
      hiddenElements.forEach((el) => {
        observer.unobserve(el);
      });
      cardElements.forEach((el) => {
        cardObserver.unobserve(el);
      });
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.welcome_container}>
        <div className={styles.welcome_left}>
          <div className={styles.hidden}>
            <div className={styles.welcome_header}>
              <h1>Welcome to Coin Craze</h1>
              <span className={styles.welcome_text}>
                {session ? `Hello, ${session.user.name}!` : "Hello, Guest!"}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.welcome_right}>
          <div className={styles.hidden}>
            <img className={styles.logo_image} src="coincraze.png"></img>
          </div>
        </div>
      </div>
      <div className={styles.information_container}>
        <div className={styles.information_left}>
          <div className={styles.hidden}>
            <div className={styles.information_image}>
              <img src="interactive.png"></img>
            </div>
          </div>
          <div className={styles.hidden}>
            <div>
              <div className={styles.information_header}>
                <h1>Endless Interactive Fun!</h1>
              </div>
              <div className={styles.information_text}>
                <span>
                  Dive into an exciting world of nonstop entertainment!
                  Play, compete, and explore thrilling challenges with virtual currency—no real money involved.
                  Enjoy the full experience with engaging gameplay, social interactions, and endless ways to have fun!
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.information_right}>
          <div className={styles.hidden}>
            <div className={styles.information_image}>
              <img src="nomoney.png"></img>
            </div>
          </div>
          <div className={styles.hidden}>
            <div className={styles.information_header}>
              <h1>No Purchase Necessary!</h1>
            </div>
            <div className={styles.information_text}>
              <span>Everything you need is already in the game!
                Play instantly with virtual currency—no payments, no paywalls, just pure gaming enjoyment.
                Jump in and start playing for free!
              </span>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.recommended_games}>
        <div className={styles.recommended_header}>
          <h1>Trending Games</h1>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg>
        </div>
        <div className={styles.cards_container}>
          <div className={styles.cards_hidden}>
            <Cards name="Plinko" image="PLINKO.png" href="" />
          </div>
          <div className={styles.cards_hidden}>
            <Cards name="Blackjack" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" href="games/blackjack" />
          </div>
          <div className={styles.cards_hidden}>
            <Cards name="Plinko" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          </div>
          <div className={styles.cards_hidden}>
            <Cards name="Crash" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          </div>
          <div className={styles.cards_hidden}>
            <Link href="/games/roulette">
            <Cards name="Roulette" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
            </Link>
          </div>
          <div className={styles.cards_hidden}>
            <Cards name="Dice" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          </div>
          <div className={styles.cards_hidden}>
            <Cards name="Mines" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          </div>
          <div className={styles.cards_hidden}>
            <Cards name="Keno" image="https://static-00.iconduck.com/assets.00/placeholder-icon-2048x2048-48kucnce.png" />
          </div>
        </div>
      </div>

      <div className={styles.rights}>
        <div className={styles.rights_text}>
          <span className={styles.title}>Coin Craze</span>
          <span className={styles.rights_reserved}>© 2024 Coin Craze | All Rights Reserved.</span>
        </div>
      </div>
    </div>

  );
}
