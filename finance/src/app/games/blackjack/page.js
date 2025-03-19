import "./style.css"
import Image from "next/image"
import cardBack from "../../../../public/cards/BACK.png"

export default function Blackjack() {
    let dealerSum = 0;
    let yourSum = 0;
    let dealerAceCount = 0;
    let yourAceCount = 0;
    let hidden;
    let deck;
    let canHit = true;

    buildDeck();
    //shuffleDeck();
    startGame();

    function buildDeck() {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"];
        deck = [];

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + types[i])
            }
        }

        console.log(deck);
    }

    function startGame(){
        hidden = deck.pop();
        dealerSum += getValue(hidden);
        dealerAceCount += checkAce(hidden);
        //console.log(hidden);
        //console.log(dealerSum);
        while(dealerSum < 17){
            let cardImg = document.createElement("img")
            let card = deck.pop();
            //cardImg.src = ""
        }

    }

    function getValue(card){
        let data = card.split(" ")
        let value = data[0];

        if (isNaN(value)){
            if (value == "A"){
                return 11;
            }
            return 10;
        }

        return parseInt(value);
    }

    function checkAce(card){
        if (card[0] == "A"){
            return 1;
        } return 0;
    }

    

    return (
        <body>
            <h2>Dealer: <span id={"dealer-sum"}></span></h2>
            <div id="dealer-cards">
                <Image
                    src={cardBack}
                    width={500}
                    height={500}
                    alt="back card"
                />
            </div>


            <h2>You:<span id="your-sum"></span></h2>
            <div id="your-cards"></div>

            <br></br>
            <button id="hit">Hit</button>
            <button id="stand">Stand</button>
            <p id="results"></p>
        </body>
    );
}