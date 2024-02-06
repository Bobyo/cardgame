import { buildDeck, shuffleDeck, drawCards, sortDrawnCards } from "./cardGame";

// Define the shapes icons used for card representation
const shapesIcons = {
  spades: "&spades;",
  diamonds: "&diams;",
  clubs: "&clubs;",
  hearts: "&hearts;",
};

// DOM elements used in the application
const elements = {
  gameContainer: document.getElementById("game-container"),
  drawContainer: document.getElementById("draw-container"),
  shuffleBtn: document.querySelector(".shuffle"),
  drawBtn: document.querySelector(".draw"),
  sortBtn: document.querySelector(".sort"),
  dialog: document.getElementById("dialog"),
  closeBtn: document.querySelector(".close"),
  submitCardCount: document.getElementById("submitBtn"),
  inputField: document.getElementById("inputField"),
  errorMessage: document.getElementById("errorMessage"),
};

// Initialize the deck and drawnDeck variables
let deck = [];
let drawnDeck = [];

// Function to handle visibility and state of the game container
function handleEmptyDeck() {
  const isDeckEmpty = deck.length === 0;
  elements.gameContainer.classList.toggle("hide", isDeckEmpty);
  elements.drawBtn.disabled = isDeckEmpty;
  elements.shuffleBtn.disabled = isDeckEmpty;
}

// Function to create a card element in the DOM
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.className = `card ${card.suit}`;
  cardElement.innerHTML = `<div class="value">${card.value}</div><div class="shape">${shapesIcons[card.suit]}</div>`;
  return cardElement;
}

// Function to display the deck of cards on the page
function displayDeck(deckAttr) {
  elements.gameContainer.innerHTML = "";
  deckAttr.forEach((card) => {
    const cardElement = createCardElement(card);
    elements.gameContainer.appendChild(cardElement);
  });
  handleEmptyDeck();
}

// Function to display the drawn deck on the page
function displayDrawnDeck(drawnDeckAttr) {
  elements.drawContainer.innerHTML = "";
  drawnDeckAttr.forEach((card) => {
    const cardElement = createCardElement(card);
    elements.drawContainer.appendChild(cardElement);
  });
  handleEmptyDeck();
}

// Event listeners for various user interactions
elements.shuffleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  deck = shuffleDeck(deck);
  displayDeck(deck);
});

elements.drawBtn.addEventListener("click", () => {
  elements.dialog.style.display = "block";
});

elements.sortBtn.addEventListener("click", () => {
  drawnDeck = sortDrawnCards(drawnDeck);
  displayDrawnDeck(drawnDeck);
});

elements.closeBtn.addEventListener("click", () => {
  elements.dialog.style.display = "none";
});

// Event listener for submitting the number of cards to draw
elements.submitCardCount.addEventListener("click", () => {
  const userInput = parseInt(elements.inputField.value, 10);
  if (userInput > 52) {
    elements.errorMessage.style.display = "block";
    elements.inputField.setCustomValidity("Number should not be over 52");
    return;
  }
  elements.errorMessage.style.display = "none";
  elements.inputField.setCustomValidity("");
  elements.inputField.reportValidity();

  const drawResult = drawCards(deck, drawnDeck, userInput);
  drawnDeck = drawResult.drawnDeck;
  deck = drawResult.remainingDeck;

  displayDeck(deck);
  displayDrawnDeck(drawnDeck);
  elements.sortBtn.disabled = false;
  elements.dialog.style.display = "none";
});

// Initialize the deck and display it on the page
deck = buildDeck();
deck = shuffleDeck(deck);
displayDeck(deck);
