'use client'
import { useSession } from "next-auth/react";
import styles from "./page.module.css";

export default function Profile() {
    const { data: session } = useSession();

    if (!session) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles["profile-container"]}>
            <h1 className={styles["profile-header"]}>Profile</h1>
            <div className={styles["profile-info"]}>
                <p>Name: {session.user.name}</p>
                <p>Email: {session.user.email}</p>
                <p>Coins: {session.user.coins}</p>
                <p>Member since: {session.user.memberSince}</p>
            </div>
            <button className={styles["sign-out"]} onClick={() => signOut()}>Sign out</button>
        </div>
    );
}