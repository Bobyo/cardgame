// cardGame.js

const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A",];

function buildDeck() {
  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { value: values[x], suit: suits[i] };
      deck.push(card);
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function drawCards(deck, nrCards) {
  let drawnDeck = [];
  for (let i = 0; i < nrCards; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let drawnCard = deck[randomIndex];
    drawnDeck.push(drawnCard);
    deck.splice(randomIndex, 1);
  }
  return { drawnDeck, remainingDeck: deck };
}

function sortDrawnCards(drawnDeck) {
  drawnDeck.sort((cardA, cardB) => {
    const suitsOrder = ["Clubs", "Spades", "Hearts", "Diamonds"];
    const valuesOrder = ["2","3","4","5","6","7","8","9","10","J","Q","K","A",];

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
