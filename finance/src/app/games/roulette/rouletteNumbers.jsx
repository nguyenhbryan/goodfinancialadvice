import styles from "./RouletteNumbers.module.css";
import { useState } from "react";

export default function RouletteNumbers({ numberClicked }) {
    const [clickedNumbers, setClickedNumbers] = useState({}); // Use an object to store clicked state for each number

    const handleNumberClick = (number) => {
        console.log(`Number clicked: ${number}`);
        // Toggle the clicked state for the specific number
        setClickedNumbers(prevState => {
            const newState = {
                ...prevState,
                [number]: !prevState[number] // Toggle the boolean value for the number
            };
            // Pass the array of clicked numbers to the parent function
            numberClicked(Object.keys(newState).filter(key => newState[key]).map(Number));
            return newState;
        });
    };

    return (
        <>
            <div className={styles.numberContainer}>
                <button
                    className={`${styles.zero} ${clickedNumbers[0] ? styles.toggled : ""}`} // Add toggled class if 0 is clicked
                    onClick={() => handleNumberClick(0)}
                >
                    0
                </button>
                {[...Array(36).keys()].map((num) => {
                    const number = num + 1;
                    return (
                        <button
                            key={number}
                            onClick={() => handleNumberClick(number)}
                            className={`${clickedNumbers[number] ? styles.toggled : ""}`} // Add toggled class based on number's click state
                        >
                            {number}
                        </button>
                    );
                })}
            </div>
        </>
    );
}