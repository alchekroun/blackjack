class CardSuit {
    static CLUBS = 'Clubs';
    static DIAMONDS = 'Diamonds';
    static HEARTS = 'Hearts';
    static SPADES = 'Spades';
}

class CardValue {
    static AS = 'AS';
    static TWO = '2';
    static THREE = '3';
    static FOUR = '4';
    static FIVE = '5';
    static SIX = '6';
    static SEVEN = '7';
    static EIGHT = '8';
    static NINE = '9';
    static TEN = '10';
    static JACK = 'J';
    static QUEEN = 'Q';
    static KING = 'K';
}

const CARD_SUITS = [CardSuit.CLUBS, CardSuit.DIAMONDS, CardSuit.HEARTS, CardSuit.SPADES];
const CARD_VALUES = [[CardValue.AS, 11], [CardValue.TWO, 2], [CardValue.THREE, 3], [CardValue.FOUR, 4], [CardValue.FIVE, 5], [CardValue.SIX, 6], [CardValue.SEVEN, 7], [CardValue.EIGHT, 8], [CardValue.NINE, 9], [CardValue.TEN, 10], [CardValue.JACK, 10], [CardValue.QUEEN, 10], [CardValue.KING, 10]]

class Card {
    constructor(face, value, suit) {
        this.face = face;
        this.value = value;
        this.suit = suit;
    }
}
// TODO : BLACK CARD
class Deck {
    constructor(nb = 1) {
        this.drawer = [];
        this.trash = [];
        for (let i = 0; i < nb; i++) {
            CARD_SUITS.forEach(suit => {
                CARD_VALUES.forEach(value => {
                    this.drawer.push(new Card(value[0], value[1], suit));
                });
            });
        }
        this.shuffle();
    }

    shuffle() {
        this.drawer = this.drawer.concat(this.trash);
        this.trash = [];
        for (let i = this.drawer.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.drawer[i], this.drawer[j]] = [this.drawer[j], this.drawer[i]];
        }
    }

    draw() {
        const idxCardToDraw = Math.floor(Math.random() * this.drawer.length);
        const cardDrawn = this.drawer[idxCardToDraw];
        this.trash.push(cardDrawn);
        this.drawer.splice(idxCardToDraw, 1);
        return cardDrawn;
    }
}

export default Deck;