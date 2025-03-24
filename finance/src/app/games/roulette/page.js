"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import RouletteNumbers from './rouletteNumbers';
import dynamic from 'next/dynamic';

const Wheel = dynamic(() => import('react-custom-roulette').then(mod => mod.Wheel), { ssr: false });

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
                <div className={styles.rouletteContainer}>
                    <div className={styles.betContainer}>
                        <div className={styles.amountText}>Total amount:</div>
                        <input
                            className={styles.input}
                            type="number"
                            name="value"
                            value={bet.value}
                            onChange={handleBetChange}
                            placeholder="0.00"
                            />
                        <button className={styles.playButton} onClick={handleSpinClick}>Play</button>
                    </div>
                    <div className={styles.wheelContainer}>
                    <div className={styles.wheelSize}>
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
                    /></div>
                    <div><RouletteNumbers/></div>
                    </div>
                </div>
                {result && <div className={styles.result}>Result: {result}</div>}
            </div>
        </>
    );
}