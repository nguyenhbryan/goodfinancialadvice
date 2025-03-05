

export default function Blackjack(){
    return (
        <body>
            <h2>Dealer: <span id={"dealer-sum"}></span></h2>
               <div id="dealer-cards">
                    <img src='./img/BACK.png'></img>
                    <img src="./img.10-C"></img>
                </div>
                    

                <h2>You: <span id="your-sum"></span></h2>
                <div id="your-cards"></div>

                <br></br>
                <button id="hit">Hit</button>
                <button id="stand">Stand</button>
            <p id="results"></p>
        </body>
    );
}