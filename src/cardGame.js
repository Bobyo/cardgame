// cardGame.js

const suits = ["clubs", "spades", "hearts", "diamonds"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",];

function buildDeck() {
  let deck = [];

  for (let suit of suits) {
    for (let value of values) {
      let card = { value, suit };
      deck.push(card);
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  let shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
}

function drawCards(deck, dDeck, nrCards) {
  const numCardsToDraw = Math.min(nrCards, deck.length);

  // Drawn cards and remaining deck
  let drawnDeck = [...dDeck];
  let remainingDeck = [...deck];

  for (let i = 0; i < numCardsToDraw; i++) {
    let randomIndex = Math.floor(Math.random() * remainingDeck.length);
    let drawnCard = remainingDeck[randomIndex];
    drawnDeck.push(drawnCard);
    remainingDeck.splice(randomIndex, 1);
  }

  return { drawnDeck, remainingDeck };
}

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
