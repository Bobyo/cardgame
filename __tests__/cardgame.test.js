import {
  buildDeck,
  shuffleDeck,
  drawCards,
  sortDrawnCards,
} from "../src/cardGame";

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

    let initialDrawnDeck = [];

    const drawResult = drawCards(deck, initialDrawnDeck, numCardsToDraw);
    const { drawnDeck, remainingDeck } = drawResult;

    // Assert that the drawn deck has the correct number of cards
    expect(drawnDeck.length).toBe(numCardsToDraw + initialDrawnDeck.length);
    // Assert that the remaining deck has the correct number of cards
    expect(remainingDeck.length).toBe(originalDeck.length - numCardsToDraw);
  });

  // Test case for drawing cards
  test("Draw Cards with already drawn cards", () => {
    let deck = buildDeck();
    let originalDeck = buildDeck();
    const numCardsToDraw = 5;

    let initialDrawnDeck = [
      { value: "A", suit: "spades" },
      { value: "2", suit: "diamonds" },
      { value: "3", suit: "clubs" },
    ];

    const drawResult = drawCards(deck, initialDrawnDeck, numCardsToDraw);
    const { drawnDeck, remainingDeck } = drawResult;

    // Assert that the drawn deck has the correct number of cards
    expect(drawnDeck.length).toBe(numCardsToDraw + initialDrawnDeck.length);
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

  test("should not over-draw more than 52 cards from the deck", () => {
    // Build the initial deck
    let deck = buildDeck();
    let initialDrawnDeck = [];

    // Attempt to draw 60 cards from the deck
    const drawnCards = drawCards(deck, initialDrawnDeck, 60);

    // Ensure that the number of drawn cards does not exceed 52
    expect(drawnCards.drawnDeck.length).toBeLessThanOrEqual(52);

    // Ensure that the remaining deck size is correct
    const remainingDeckSize = deck.length - drawnCards.drawnDeck.length;
    expect(remainingDeckSize).toBeGreaterThanOrEqual(0);
  });

  test("should not over-draw more than 52 cards from the deck when we already drawn cards", () => {
    // Build the initial deck
    let deck = buildDeck();

    let initialDrawnDeck = [
      { value: "A", suit: "spades" },
      { value: "2", suit: "diamonds" },
      { value: "3", suit: "clubs" },
    ];

    // Attempt to draw 60 cards from the deck, considering the initial drawn deck
    const drawnCards = drawCards(deck, initialDrawnDeck, 60);

    // Ensure that the number of drawn cards does not exceed 52
    const maxAllowedDrawnCards = 52;
    expect(
      drawnCards.drawnDeck.length - initialDrawnDeck.length
    ).toBeLessThanOrEqual(maxAllowedDrawnCards);

    // Ensure that the remaining deck size is correct
    const remainingDeckSize =
      deck.length - drawnCards.drawnDeck.length + initialDrawnDeck.length;
    expect(remainingDeckSize).toBeGreaterThanOrEqual(0);
  });
});
