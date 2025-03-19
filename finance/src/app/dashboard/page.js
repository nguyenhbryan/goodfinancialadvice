'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div className={styles.body}>
            <h1 className={styles.maintitle}>Welcome to the Dashboard.</h1>
            <div className={styles.container}>
                <div className={styles.left_container}>
                    <div className={styles.avatar}>
                        <h1 className={styles.hello}>Hello,</h1>
                        <span className={styles.name}>
                            {session ? `${session.user.name}` : "Guest"}
                        </span>
                        <hr className={styles.separator}></hr>
                    </div>
                    <div className={styles.profile}>
                        <h1 className={styles.subtitle}>Account overview</h1>
                        <p>Here's a summary of your finances.</p>
                        <p>Current Balance: {session?.user?.coins}</p>
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
                        <p>Number of Wagered Games Played: {session?.user?.played}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}