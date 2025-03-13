import "./style.css"
import Image from "next/image"
import cardBack from "../../../../public/cards/BACK.png"

let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let deck;
let canHit = true;

    function buildDeck() {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"];
        deck = [];


function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + types[i])
            }
        }
    }

    buildDeck();

    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i])   
        }
    }
}


export default function Blackjack(){
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