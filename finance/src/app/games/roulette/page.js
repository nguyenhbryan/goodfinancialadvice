"use client";
import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import styles from './page.module.css';

export default function Roulette() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [result, setResult] = useState(null);
    const data = [
        { option: '0', style: { backgroundColor: 'green' } },
        { option: '32', style: { backgroundColor: 'red' } },
        { option: '15', style: { backgroundColor: 'black' } },
        { option: '19', style: { backgroundColor: 'red' } },
        { option: '4', style: { backgroundColor: 'black' } },
        { option: '21', style: { backgroundColor: 'red' } },
        { option: '2', style: { backgroundColor: 'black' } },
        { option: '25', style: { backgroundColor: 'red' } },
        { option: '17', style: { backgroundColor: 'black' } },
        { option: '34', style: { backgroundColor: 'red' } },
        { option: '6', style: { backgroundColor: 'black' } },
        { option: '27', style: { backgroundColor: 'red' } },
        { option: '13', style: { backgroundColor: 'black' } },
        { option: '36', style: { backgroundColor: 'red' } },
        { option: '11', style: { backgroundColor: 'black' } },
        { option: '30', style: { backgroundColor: 'red' } },
        { option: '8', style: { backgroundColor: 'black' } },
        { option: '23', style: { backgroundColor: 'red' } },
        { option: '10', style: { backgroundColor: 'black' } },
        { option: '5', style: { backgroundColor: 'red' } },
        { option: '24', style: { backgroundColor: 'black' } },
        { option: '16', style: { backgroundColor: 'red' } },
        { option: '33', style: { backgroundColor: 'black' } },
        { option: '1', style: { backgroundColor: 'red' } },
        { option: '20', style: { backgroundColor: 'black' } },
        { option: '14', style: { backgroundColor: 'red' } },
        { option: '31', style: { backgroundColor: 'black' } },
        { option: '9', style: { backgroundColor: 'red' } },
        { option: '22', style: { backgroundColor: 'black' } },
        { option: '18', style: { backgroundColor: 'red' } },
        { option: '29', style: { backgroundColor: 'black' } },
        { option: '7', style: { backgroundColor: 'red' } },
        { option: '28', style: { backgroundColor: 'black' } },
        { option: '12', style: { backgroundColor: 'red' } },
        { option: '35', style: { backgroundColor: 'black' } },
        { option: '3', style: { backgroundColor: 'red' } },
        { option: '26', style: { backgroundColor: 'black' } },
    ];


    const [bet, setBet] = useState({ type: '', value: '' });

    const handleBetChange = (e) => {
        const { name, value } = e.target;
        setBet((prevBet) => ({ ...prevBet, [name]: value }));
    };

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
            setResult(null);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h1>Roulette Game</h1>
                <p>Bet: Odd/Even, Red/Black, Number</p>
                <div className={styles.betContainer}>
                    <label>
                        Bet Type:
                        <select name="type" value={bet.type} onChange={handleBetChange}>
                            <option value="">Select</option>
                            <option value="odd">Odd</option>
                            <option value="even">Even</option>
                            <option value="red">Red</option>
                            <option value="black">Black</option>
                            <option value="number">Number</option>
                        </select>
                    </label>
                    {bet.type === 'number' && (
                        <label>
                            Bet Value:
                            <input
                                type="number"
                                name="value"
                                value={bet.value}
                                onChange={handleBetChange}
                                min="0"
                                max="36"
                            />
                        </label>
                    )}
                </div>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    outerBorderColor='white'
                    textColors={['white']}
                    innerRadius={50}
                    innerBorderWidth={15}
                    innerBorderColor='white'
                    textDistance={80}
                    radiusLineColor='#FFE140'
                    onStopSpinning={() => {
                        setMustSpin(false);
                        setResult(`${data[prizeNumber].option} : ${data[prizeNumber].style?.backgroundColor || 'red/black'}`);
                    }}
                />
                <button onClick={handleSpinClick}>SPIN</button>
                {result && <div className={styles.result}>Result: {result}</div>}
                <div className={styles.currentBet}>
                    <h2>Current Bet</h2>
                    <p>Type: {bet.type}</p>
                    <p>Value: {bet.value}</p>
                </div>
            </div>
        </>
    );
}