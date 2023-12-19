const playerBtn = document.getElementById("player-btn");
const playerStandBtn = document.getElementById("player-stand-btn");
const dealerBtn = document.getElementById("dealer-btn");
const dealerStandBtn = document.getElementById("dealer-stand-btn");
const startBtn = document.getElementById("start-btn");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const gameResult = document.getElementById("game-result");

const cardColors = ["Corazón rojo", "Brillo rojo", "Corazón negro", "Trébol negro"];
const cardValues = ["As(1)", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let playerTotal = 0;
let dealerTotal = 0;
const playerCards = [];
const dealerCards = [];
const availableCards = [];

let gameOver = false;

for (let i = 0; i < cardColors.length * cardValues.length; i++) {
    availableCards.push(i);
}

function getRandomCard() {
    if (availableCards.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const cardIndex = availableCards.splice(randomIndex, 1)[0];
    return cardIndex;
}

function getCardName(cardIndex) {
    const colorIndex = Math.floor(cardIndex / cardValues.length);
    const valueIndex = cardIndex % cardValues.length;
    return `${cardColors[colorIndex]}: ${cardValues[valueIndex]}`;
}

playerBtn.addEventListener("click", () => {
    if (!gameOver) {
        const cardIndex = getRandomCard();
        if (cardIndex !== null) {
            const cardValue = (cardIndex % cardValues.length) + 1;
            playerTotal += cardValue > 10 ? 10 : cardValue;
            playerScore.textContent = playerTotal;
            playerCards.push(getCardName(cardIndex));
            checkPlayerScore();
        }
    }
});

dealerBtn.addEventListener("click", () => {
    if (!gameOver && !dealerStandBtn.disabled) {
        const cardIndex = getRandomCard();
        if (cardIndex !== null) {
            const cardValue = (cardIndex % cardValues.length) + 1;
            dealerTotal += cardValue > 10 ? 10 : cardValue;
            dealerScore.textContent = dealerTotal;
            dealerCards.push(getCardName(cardIndex));
            checkDealerScore();
        }
        if (!gameOver && !dealerStandBtn.disabled) {
            dealerBtn.click(); // Simulate automatic card drawing for the dealer
        }
    }
});

dealerStandBtn.addEventListener("click", () => {
    dealerBtn.disabled = true;
    dealerStandBtn.disabled = true;
    checkFinalResult();
    showPlayerAndDealerCards();
});

playerStandBtn.addEventListener("click", () => {
    playerStandBtn.disabled = true;
    dealerBtn.disabled = false;
    dealerStandBtn.disabled = false;
});

function checkPlayerScore() {
    if (playerTotal >= 21) {
        playerStandBtn.click();
    }
}

function checkDealerScore() {
    if (dealerTotal < 17) {
        dealerBtn.click();
    }
}
[]
function checkFinalResult() {
    if (playerTotal > 21 && dealerTotal > 21) {
        gameResult.textContent = "Ambos pierden. ¡Ambos jugadores se pasaron de 21!";
    } else if (playerTotal > 21) {
        gameResult.textContent = "Máquina gana. El jugador se pasó de 21.";
    } else if (dealerTotal > 21) {
        gameResult.textContent = "Jugador gana. La máquina se pasó de 21.";
    } else if (playerTotal === dealerTotal) {
        gameResult.textContent = "Empate. Las sumas son iguales.";
    } else if (playerTotal > dealerTotal) {
        gameResult.textContent = "Jugador gana. Mayor suma.";
    } else {
        gameResult.textContent = "Máquina gana. Mayor suma.";
    }
    
    gameOver = true;
    dealerBtn.disabled = true;
    playerBtn.disabled = true;
    playerStandBtn.disabled = true;
    dealerStandBtn.disabled = true;
    startBtn.disabled = false;
}

function showPlayerAndDealerCards() {
    let playerCardsText = `Cartas del jugador:\n${playerCards.join("\n")}`;
    let dealerCardsText = `Cartas de la máquina:\n${dealerCards.join("\n")}`;
    
    gameResult.textContent += `\n\n${playerCardsText}\n\n${dealerCardsText}\n`;
}

startBtn.addEventListener("click", () => {
    playerTotal = 0;
    dealerTotal = 0;
    playerScore.textContent = playerTotal;
    dealerScore.textContent = dealerTotal;
    playerCards.length = 0;
    dealerCards.length = 0;
    availableCards.length = 0;

    for (let i = 0; i < cardColors.length * cardValues.length; i++) {
        availableCards.push(i);
    }

    gameOver = false;
    gameResult.textContent = "";
    playerBtn.disabled = false;
    playerStandBtn.disabled = false;
    dealerBtn.disabled = true;
    dealerStandBtn.disabled = true;
    startBtn.disabled = true;

    for (let i = 0; i < 2; i++) {
        const cardIndex = getRandomCard();
        if (cardIndex !== null) {
            const cardValue = (cardIndex % cardValues.length) + 1;
            playerTotal += cardValue > 10 ? 10 : cardValue;
            playerScore.textContent = playerTotal;
            playerCards.push(getCardName(cardIndex));
            checkPlayerScore();
        }
        if (i === 1) {
            dealerBtn.click();
        }
    }
});
