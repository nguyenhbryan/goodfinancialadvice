"use client";

import { useState } from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
    const [isGamesOpen, setIsGamesOpen] = useState(false);

    const toggleGamesMenu = () => {
        setIsGamesOpen(!isGamesOpen);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <ul className={styles.list}>
                    <li className={styles.first}>
                        <span className={styles.logo}>Coin Craze</span>
                        <a className={styles.open}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" /></svg>
                        </a>
                    </li>
                </ul>
                <ul className={styles.list}>
                    <li className={styles.active}>
                        <button className={styles.buttons}>
                            <Link href="/">
                            <Link href="/">
                                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" /></svg>
                                Home
                            </Link>
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className={styles.buttons}>
                            <Link href="/">
                                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>
                                Dashboard
                            </Link>
                        </button>
                    </li>
                    <li className={styles.games}>
                        <button className={styles.dropdown} onClick={toggleGamesMenu}>
                            <a>
                                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z" /></svg>
                                Games
                                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                            </a>

                        </button>
                        <ul className={`${styles.submenu} ${isGamesOpen ? styles.show : ""}`}>
                            <li><a href="#">Crash</a></li>
                            <li><a href="#">Plinko</a></li>
                            <li><a href="#">Blackjack</a></li>
                        </ul>
                    </li>
                    <li>
                    <button className={styles.buttons}>
                            <Link href="/login">
                                Login
                            </Link>
                    </button>
                        <button className={styles.buttons}>
                            <Link href="/login">
                                Profile
                            </Link>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}