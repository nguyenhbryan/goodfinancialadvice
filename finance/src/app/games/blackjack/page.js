"use client";

//import './style.css';
import styles from "./page.module.css";
import Image from "next/image";
import cardBack from "../../../../public/cards/BACK.png";
import { useState, useEffect } from "react";

export default function Blackjack() {
  const [dealerSum, setDealerSum] = useState(0);
  const [yourSum, setYourSum] = useState(0);
  const [dealerAceCount, setDealerAceCount] = useState(0);
  const [yourAceCount, setYourAceCount] = useState(0);
  const [hidden, setHidden] = useState(null);
  const [deck, setDeck] = useState([]);
  const [canHit, setCanHit] = useState(false); // Disable hit and stand initially
  const [dealerCards, setDealerCards] = useState([]);
  const [yourCards, setYourCards] = useState([]);
  const [results, setResults] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [playerBusted, setPlayerBusted] = useState(false);
  const [shownDealerCard, setShownDealerCard] = useState(null);
  const [revealAllDealerCards, setRevealAllDealerCards] = useState(false);
  const [showStartGameButton, setShowStartGameButton] = useState(true);
  const [showNewGameButton, setShowNewGameButton] = useState(false);
  const [playerWon, setPlayerWon] = useState(null); // null, true, or false
  const [hasAceBeenAdjusted, setHasAceBeenAdjusted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      startGame();
    }
  }, [gameStarted, deck]); // Run startGame when gameStarted changes and when the deck is built

  const handleStartGame = () => {
    setShowStartGameButton(false);
    setCanHit(true); // Enable hit and stand
    setGameStarted(true);
    buildDeck();
  };

  const newGame = () => {
    setDealerSum(0);
    setYourSum(0);
    setDealerAceCount(0);
    setYourAceCount(0);
    setHidden(null);
    setDeck([]);
    setCanHit(true);
    setDealerCards([]);
    setYourCards([]);
    setResults("");
    setGameStarted(true);
    setPlayerBusted(false);
    setShownDealerCard(null);
    setRevealAllDealerCards(false);
    setShowNewGameButton(false); // Hide the new game button
    setShowStartGameButton(false);
    setPlayerWon(null); // Reset win/loss state
    setHasAceBeenAdjusted(false);
    buildDeck();
  };

  useEffect(() => {
    if (deck.length > 0 && gameStarted) {
      startGame();
    }
  }, [deck, gameStarted]);

  function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    let newDeck = [];

    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        newDeck.push(values[j] + "-" + types[i]);
      }
    }
    setDeck(newDeck.sort(() => Math.random() - 0.5)); // Shuffle the deck
  }

  async function startGame() {
    if (deck.length === 0) return;

    let hiddenCard = deck.pop();
    let shownCard = deck.pop();
    setHidden(hiddenCard);
    setShownDealerCard(shownCard);

    setDealerSum(getValue(shownCard));
    setDealerAceCount(checkAce(shownCard));
    setDealerCards([shownCard, hiddenCard]); //Show card is first in array

    let card1 = deck.pop();
    let card2 = deck.pop();
    setYourCards([card1, card2]); // Player starts with 2 cards

    let initialSum = getValue(card1) + getValue(card2);
    let initialAceCount = checkAce(card1) + checkAce(card2);

    setYourSum(initialSum);
    setYourAceCount(initialAceCount);

    let adjustedSum = reduceAce(initialSum, initialAceCount);
    setYourSum(adjustedSum);

    if (adjustedSum > 21) {
      setCanHit(false);
      setPlayerBusted(true);
      setResults("You Bust! Dealer Wins!");
      setRevealAllDealerCards(true);
      setDealerSum(getValue(shownCard) + getValue(hiddenCard));
      setShowNewGameButton(true); // Show new game button after round is over
      setPlayerWon(false); // Player lost
    }
  }

  function getValue(card) {
    if (!card) return 0;

    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
      if (value === "A") {
        return 11;
      }
      return 10;
    }

    return parseInt(value);
  }

  function checkAce(card) {
    if (!card) return 0;

    let data = card.split("-");
    if (data[0] === "A") {
      return 1;
    }
    return 0;
  }

  const handleHit = () => {
    if (!canHit || deck.length === 0) return;

    let card = deck.pop();
    let newValue = yourSum + getValue(card);
    let newAceCount = yourAceCount + checkAce(card);

    setYourCards([...yourCards, card]);

    let adjustedSum = newValue;
    if (!hasAceBeenAdjusted) {
      adjustedSum = reduceAce(newValue, newAceCount);
    }

    setYourSum(adjustedSum);
    setYourAceCount(newAceCount);

    if (adjustedSum > 21) {
      setCanHit(false);
      setPlayerBusted(true);
      setResults("You Bust! Dealer Wins!");
      setRevealAllDealerCards(true);
      setDealerSum(getValue(shownDealerCard) + getValue(hidden));
      setShowNewGameButton(true); // Show new game button after round is over
      setPlayerWon(false); // Player lost
    }
  };

  const handleStand = () => {
    if (!canHit) return;

    setCanHit(false);
    setRevealAllDealerCards(true);
    revealDealer();
  };

  const revealDealer = async () => {
    let revealedDealerCards = [...dealerCards];
    let revealedDealerSum = getValue(shownDealerCard);
    let revealedDealerAceCount = checkAce(shownDealerCard);

    // Reveal the hidden card
    let hiddenCardValue = getValue(hidden);
    revealedDealerSum += hiddenCardValue;
    revealedDealerAceCount += checkAce(hidden);

    let finalDealerSum = revealedDealerSum;
    let finalDealerAceCount = revealedDealerAceCount;

    while (finalDealerSum < 17 && deck.length > 0 && !playerBusted) {
      let card = deck.pop();
      revealedDealerCards.push(card);
      let cardValue = getValue(card);
      let cardAce = checkAce(card);

      finalDealerSum += cardValue;
      finalDealerAceCount += cardAce;

        finalDealerSum = reduceAce(finalDealerSum, finalDealerAceCount);

    }



    setDealerCards(revealedDealerCards);
    setDealerSum(finalDealerSum);

    let finalYourSum = yourSum;

    let message = determineWinner(finalDealerSum, finalYourSum);
    setResults(message);

    if (message === "You Win!" || message === "Dealer Busts! You Win!") {
      setPlayerWon(true);
    } else if (message === "Tie!") {
      setPlayerWon(null);
    } else {
      setPlayerWon(false);
    }
    setShowNewGameButton(true); // Show new game button after round is over
  };

  function reduceAce(playerSum, playerAceCount) {
    let sum = playerSum;
    let aceCount = playerAceCount;

    while (sum > 21 && aceCount > 0) {
      sum -= 10;
      aceCount -= 1;
      setHasAceBeenAdjusted(true);
    }
    return sum;
  }

  function determineWinner(dealerSum, yourSum) {
    if (yourSum > 21) {
      return "You Bust! Dealer Wins!";
    } else if (dealerSum > 21) {
      return "Dealer Busts! You Win!";
    } else if (dealerSum === yourSum) {
      return "Tie!";
    } else if (yourSum > dealerSum) {
      return "You Win!";
    } else {
      return "Dealer Wins!";
    }
  }

  const cardStyle = {
    width: "150px",
    marginRight: "5px",
    padding: "5px",
    height: "auto", // Let the height adjust automatically to maintain aspect ratio
  };

  const yourSumStyle = {
    color: playerWon === true ? "green" : playerWon === false ? "red" : "white", // Default to white
  };

  return (
    <div className={styles.container}>
      {/* Default text color for the body */}
      {!gameStarted && showStartGameButton && (
        <button onClick={handleStartGame}>Start Game</button>
      )}

      {gameStarted && (
        <>
          <h2>Dealer: <span id={"dealer-sum"}>{dealerSum}</span></h2>
          <div id="dealer-cards">
            {dealerCards.map((card, index) =>
              revealAllDealerCards ? (
                <img
                  key={index}
                  src={`/cards/${card}.png`}
                  alt={`card ${index + 1}`}
                  className={styles.cardStyle}
                />
              ) : (
                index === 0 ? (
                  <img
                    key={index}
                    src={`/cards/${card}.png`}
                    width={75}
                    height={100}
                    alt={`card ${index + 1}`}
                    className={styles.cardStyle}
                  />
                ) : (
                  <Image
                    key={index}
                    src={cardBack}
                    alt={`card ${index + 1}`}
                    width={75}
                    height={100}
                    className={styles.cardStyle}
                  />
                )
              )
            )}
          </div>
          <h2>
            You: <span id="your-sum" style={yourSumStyle}>
              {yourSum}
            </span>
          </h2>
          <div id="your-cards">
            {yourCards.map((card, index) => (
              <img
                key={index}
                src={`/cards/${card}.png`}
                alt={`card ${index + 1}`}
                className={styles.cardStyle}
              />
            ))}
          </div>
          <br></br>
          <button id="hit" onClick={handleHit} disabled={!canHit}>
            Hit
          </button>
          <button id="stand" onClick={handleStand} disabled={!canHit}>
            Stand
          </button>
        </>
      )}

      {showNewGameButton && (
        <button onClick={newGame}>New Game</button>
      )}

      <p className={styles.results}>{results}</p>
    </div>
  );
}