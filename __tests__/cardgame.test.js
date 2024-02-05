import { buildDeck, shuffleDeck, drawCards, sortDrawnCards } from "../cardGame";

describe("Card Game Functionality", () => {
  test("Build Deck", () => {
    const deck = buildDeck();
    // Assert that the deck has the correct length (52 cards)
    expect(deck.length).toBe(52);
    // Assert that the deck contains at least one card
    expect(deck).toContainEqual({ value: "2", suit: "spades" });
  });

  // Test case for shuffling cards
  test("Shuffle Deck", () => {
    let deck = buildDeck();
    let originalDeck = [...deck];
    // Shuffle the deck
    deck = shuffleDeck(deck);
    // Assert that the shuffled deck is not the same as the original deck
    expect(deck).not.toEqual(originalDeck);
    // Assert that the length of the deck remains the same after shuffling
    expect(deck.length).toBe(originalDeck.length);
  });

  // Test case for drawing cards
  test("Draw Cards", () => {
    let deck = buildDeck();
    let originalDeck = buildDeck();
    const numCardsToDraw = 5;
    const drawResult = drawCards(deck, numCardsToDraw);
    const { drawnDeck, remainingDeck } = drawResult;

    // Assert that the drawn deck has the correct number of cards
    expect(drawnDeck.length).toBe(numCardsToDraw);
    // Assert that the remaining deck has the correct number of cards
    expect(remainingDeck.length).toBe(originalDeck.length - numCardsToDraw);
  });

  // Test case for sorting drawn cards
  test("Sort Drawn Cards", () => {
    let drawnDeck = [
      { value: "5", suit: "hearts" },
      { value: "2", suit: "spades" },
      { value: "Q", suit: "diamonds" },
    ];
    // Sort the drawn cards
    drawnDeck = sortDrawnCards(drawnDeck);
    // Assert that the drawn cards are sorted correctly by suit and value
    expect(drawnDeck).toEqual([
      { value: "2", suit: "spades" },
      { value: "5", suit: "hearts" },
      { value: "Q", suit: "diamonds" },
    ]);
  });
});
