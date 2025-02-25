import styles from "./page.module.css";
import Cards from "./Cards.jsx";

export default function Home() {
  return (
    <div>
      <div className={styles.welcome_container}>
        <div className={styles.welcome_left}>
          <div>
            Welcome User!
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
        <Cards name="Blackjack" image="https://play-lh.googleusercontent.com/009hpXoLRxULWBEF8VsHnNTjFrOQVFKfkQfIxZcDGWtVSZEU5mKtSJyy3Zv3pxVcZQ" />
        <Cards name="Plinko" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDs3AioTT6XtxOS1nwXtmcrSR4Rh5xWZ2E0g&s" />
      </div>
    </div>
  );
}
