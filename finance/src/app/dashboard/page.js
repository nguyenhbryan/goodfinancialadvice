import styles from './page.module.css';

export default function Dashboard() {


    return (
        <div className={styles.body}>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className={styles.title}>Dashboard</h1>
                <p className="text-lg">Welcome to your dashboard!</p>
            </div>
        </div>
    );
}