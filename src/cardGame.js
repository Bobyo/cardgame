// Define the suits and values for creating the deck of cards
const suits = ["clubs", "spades", "hearts", "diamonds"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

// Function to build a deck of cards
function buildDeck() {
  let deck = [];

  // Iterate through each suit and value to create each card
  for (let suit of suits) {
    for (let value of values) {
      let card = { value, suit };
      deck.push(card);
    }
  }

  return deck;
}

// Function to shuffle a deck of cards
function shuffleDeck(deck) {
  // Create a copy of the deck to avoid mutating the original array
  let shuffledDeck = [...deck];

  // Shuffle the deck using FY
  // So we don't pop the first elem of the array and break it
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
}

// Function to draw a specified number of cards from the deck
function drawCards(deck, dDeck, nrCards) {
  // don't attempt to draw more cards than are available in the deck
  const numCardsToDraw = Math.min(nrCards, deck.length);

  // Initialize drawn cards and remaining deck
  let drawnDeck = [...dDeck];
  let remainingDeck = [...deck];

  // Draw cards from the remaining deck
  for (let i = 0; i < numCardsToDraw; i++) {
    let randomIndex = Math.floor(Math.random() * remainingDeck.length);
    let drawnCard = remainingDeck[randomIndex];
    drawnDeck.push(drawnCard);
    remainingDeck.splice(randomIndex, 1);
  }

  return { drawnDeck, remainingDeck };
}

// Function to sort drawn cards based on suits and values
function sortDrawnCards(drawnDeck) {
  drawnDeck.sort((cardA, cardB) => {
    let suitsOrder = suits;
    let valuesOrder = values;

    // Compare suits first
    const suitIndexA = suitsOrder.indexOf(cardA.suit);
    const suitIndexB = suitsOrder.indexOf(cardB.suit);
    if (suitIndexA !== suitIndexB) {
      return suitIndexA - suitIndexB;
    }

    // If suits are the same, compare values
    const valueIndexA = valuesOrder.indexOf(cardA.value);
    const valueIndexB = valuesOrder.indexOf(cardB.value);
    return valueIndexA - valueIndexB;
  });

  return drawnDeck;
}

export { buildDeck, shuffleDeck, drawCards, sortDrawnCards };
