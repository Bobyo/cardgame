import { buildDeck, shuffleDeck, drawCards, sortDrawnCards } from "./cardGame";

const shapesIcons = {
  spades: "&spades;",
  diamonds: "&diams;",
  clubs: "&clubs;",
  hearts: "&hearts;",
};

// Initialize deck and drawnDeck variables
let deck = [];
let drawnDeck = [];

// DOM elements
const gameContainer = document.getElementById("game-container");
const drawContainer = document.getElementById("draw-container");
const shuffleBtn = document.querySelector(".shuffle");
const drawBtn = document.querySelector(".draw");
const sortBtn = document.querySelector(".sort");
const dialog = document.getElementById("dialog");
const closeBtn = document.getElementsByClassName("close")[0];
const submitCardCount = document.getElementById("submitBtn");
const inputField = document.getElementById("inputField");
const errorMessage = document.getElementById("errorMessage");

// Function to create a card element
function createCardElement(card) {
  let cardElement = document.createElement("div");
  cardElement.className = `card ${card.suit}`;
  cardElement.innerHTML = `<div class="value">${card.value}</div><div class="shape">${shapesIcons[card.suit]}</div>`;
  return cardElement;
}

// Function to display the deck on the page
function displayDeck(deckAttr) {
  gameContainer.innerHTML = "";
  deckAttr.forEach((card) => {
    let cardElement = createCardElement(card);
    gameContainer.appendChild(cardElement);
  });
}

// Function to display the drawn deck on the page
function displayDrawnDeck(drawnDeckAttr) {
  drawContainer.innerHTML = "";
  drawnDeckAttr.forEach((card) => {
    let cardElement = createCardElement(card);
    drawContainer.appendChild(cardElement);
  });
}

// Event listeners

shuffleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deck = shuffleDeck(deck);
  displayDeck(deck);
});

drawBtn.addEventListener("click", () => {
  dialog.style.display = "block";
});

sortBtn.addEventListener("click", () => {
  drawnDeck = sortDrawnCards(drawnDeck);
  displayDrawnDeck(drawnDeck);
});

closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

submitCardCount.addEventListener("click", () => {
  const userInput = parseInt(inputField.value, 10);
  if (userInput > 52) {
    errorMessage.style.display = "block";
    inputField.setCustomValidity("Number should not be over 52");
    return;
  } else {
    errorMessage.style.display = "none";
    inputField.setCustomValidity("");
  }

  inputField.reportValidity();
  const drawResult = drawCards(deck, userInput);
  drawnDeck = drawResult.drawnDeck;
  deck = drawResult.remainingDeck;

  displayDeck(deck);
  displayDrawnDeck(drawnDeck);
  sortBtn.disabled = false;
  dialog.style.display = "none";
});

// Initial setup
deck = buildDeck();
deck = shuffleDeck(deck);
displayDeck(deck);

