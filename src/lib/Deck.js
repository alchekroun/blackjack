class CardSuit {
    static CLUBS = 'clubs';
    static DIAMONDS = 'diamonds';
    static HEARTS = 'hearts';
    static SPADES = 'spades';
}

class CardValue {
    static ACE = 'ace';
    static TWO = '2';
    static THREE = '3';
    static FOUR = '4';
    static FIVE = '5';
    static SIX = '6';
    static SEVEN = '7';
    static EIGHT = '8';
    static NINE = '9';
    static TEN = '10';
    static JACK = 'jack';
    static QUEEN = 'queen';
    static KING = 'king';
}

const CARD_SUITS = [CardSuit.CLUBS, CardSuit.DIAMONDS, CardSuit.HEARTS, CardSuit.SPADES];
const CARD_VALUES = [[CardValue.ACE, 11], [CardValue.TWO, 2], [CardValue.THREE, 3], [CardValue.FOUR, 4], [CardValue.FIVE, 5], [CardValue.SIX, 6], [CardValue.SEVEN, 7], [CardValue.EIGHT, 8], [CardValue.NINE, 9], [CardValue.TEN, 10], [CardValue.JACK, 10], [CardValue.QUEEN, 10], [CardValue.KING, 10]]

class Card {
    constructor(face, value, suit) {
        this.face = face;
        this.value = value;
        this.suit = suit;
        this.down = false;
        this.image = '/src/assets/svg-cards/' + face + '_of_' + suit + (face == 'king' || face == 'queen' || face == 'jack' ? '2' : '') + '.svg'
    }
}
// TODO : BLACK CARD
class Deck {
    constructor(nb = 1) {
        this.shoe = [];
        this.trash = [];
        for (let i = 0; i < nb; i++) {
            CARD_SUITS.forEach(suit => {
                CARD_VALUES.forEach(value => {
                    this.shoe.push(new Card(value[0], value[1], suit));
                });
            });
        }
        // this.shoe.push(new Card('RESHUFFLE', -1, 'RESHUFFLE')); // Reshuffle card
        this.shuffle();
    }

    shuffle() {
        this.shoe = this.shoe.concat(this.trash);
        this.trash = [];
        for (let i = this.shoe.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
        }
    }

    draw() {
        const idxCardToDraw = Math.floor(Math.random() * this.shoe.length);
        const cardDrawn = this.shoe[idxCardToDraw];
        this.trash.push(cardDrawn);
        this.shoe.splice(idxCardToDraw, 1);
        return cardDrawn;
    }

    getCCCount() {
        let count = 0;
        this.trash.forEach(card => {
            if (!card.down) {
                if (card.value <= 6) count++;
                if (card.value >= 10) count--;
            }
        });
        return count;
    }

    getTensInShoe() {
        let count = 0;
        this.shoe.forEach(card => {
            if (card.value >= 10) count++;
        });
        // Dealer face down card
        this.trash.forEach(card => {
            if (card.down && card.value >= 10) count++;
        })
        return count;
    }

    getTenProba(dealer = false) {
        return this.getTensInShoe() / (this.shoe.length + (dealer ? -1 : 0));
    }

    static calculateHandScore(handCards) {
        let score = 0;
        let hasAs = false;
        handCards.forEach(card => {
            score += card.down ? 0 : card.value;
            hasAs = hasAs || card.face == 'ACE'
        });
        if (score > 21 && hasAs) {
            score -= 10;
        };
        return score;
    }

    static canHit(handCards) {
        return this.calculateHandScore(handCards) < 21;
    }

    static hasBlackJack(handCards) {
        if (handCards[0] == 'ACE') return handCards[1] == 'king' || handCards[1] == 'queen' || handCards[1] == 'jack';
        if (handCards[1] == 'ACE') return handCards[0] == 'king' || handCards[0] == 'queen' || handCards[0] == 'jack';
        return false;
    }

    static canSplit(handCards) {
        return handCards[0].face == handCards[1].face
    }
}

export default Deck;