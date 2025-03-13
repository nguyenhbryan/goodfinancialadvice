import "./style.css"




export default function Blackjack() {
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

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + types[i])
            }
        }
    }

    buildDeck();

    return (
        <body>
            <h2>Dealer: <span id={"dealer-sum"}></span></h2>
            <div id="dealer-cards">
                <img id="hidden" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ACard_back_01.svg&psig=AOvVaw1HElOs8KOKSKDzsSV1CHAu&ust=1741288998143000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOid4abV84sDFQAAAAAdAAAAABAE" alt="Back of Card" />
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