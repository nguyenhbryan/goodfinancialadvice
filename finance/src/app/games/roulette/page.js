"use client";
import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import styles from './page.module.css';

export default function Roulette() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [result, setResult] = useState(null);

    const data = [
        { option: '0', style: { backgroundColor: 'green'}},
        { option: '32' },
        { option: '15' },
        { option: '19' },
        { option: '4' },
        { option: '21' },
        { option: '2' },
        { option: '25' },
        { option: '17' },
        { option: '34' },
        { option: '6' },
        { option: '27' },
        { option: '13' },
        { option: '36' },
        { option: '11' },
        { option: '30' },
        { option: '8' },
        { option: '23' },
        { option: '10' },
        { option: '5' },
        { option: '24' },
        { option: '16' },
        { option: '33' },
        { option: '1' },
        { option: '20' },
        { option: '14' },
        { option: '31' },
        { option: '9' },
        { option: '22' },
        { option: '18' },
        { option: '29' },
        { option: '7' },
        { option: '28' },
        { option: '12' },
        { option: '35' },
        { option: '3' },
        { option: '26' },
    ];
    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    return (
        <div className={styles.container}>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                outerBorderColor='white'
                backgroundColors={['#ee4b2b', '#000000']}
                textColors={['white']}
                innerRadius={50}
                innerBorderWidth={15}
                innerBorderColor='white'
                textDistance={80}
                radiusLineColor='#FFE140'
                onStopSpinning={() => {
                    setMustSpin(false);
                    setResult(data[prizeNumber].option);
                }}
            />
            <button onClick={handleSpinClick}>SPIN</button>
            {result && <div className={styles.result}>Result: {result}</div>}
        </div>
    );
}