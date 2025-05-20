'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './page.module.css';
import { useEffect } from 'react';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [coins, setCoins] = useState(0);
    console.log("Session data:", session);
    useEffect(() => {
            fetch(`/api/users/${session?.user?.id}`).then((res) => res.json()).then((data) => {setGamesPlayed(data.gamesPlayed)
            setCoins(data.coins);
            });

        }, []);

    return (
        <div className={styles.body}>
            <h1 className={styles.maintitle}>Welcome to the Dashboard.</h1>
            <div className={styles.container}>
                <div className={styles.left_container}>
                    <div className={styles.avatar}>
                        <h1 className={styles.hello}>Hello,</h1>
                        <span className={styles.name}>
                            {status === "authenticated" ? `${session?.user?.name}` : "Guest"}
                        </span>
                        <hr className={styles.separator}></hr>
                    </div>
                    <div className={styles.profile}>
                        <h1 className={styles.subtitle}>Account overview</h1>
                        <p>Here's a summary of your finances.</p>
                        <p>Current Balance: {coins.toFixed(2)   }</p>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.news}>
                        <h1 className={styles.subtitle}>News</h1>
                        <p>Here's some news to keep you updated.</p>
                    </div>
                    <div className={styles.achievements}>
                        <h1 className={styles.subtitle}>Achievements</h1>
                    </div>
                    <div className={styles.stats}>
                        <h1 className={styles.subtitle}>Stats</h1>
                        <p>Here's some stats to keep you updated.</p>
                        <p>Number of Wagered Games Played: {gamesPlayed}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}