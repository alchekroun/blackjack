import { useEffect, useState } from "react";

const Hand = ({name, cards}) => {

    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setFirstCard(cards[0]);
        setSecondCard(cards[1]);
    }, [cards]);

    useEffect(() => {
        calculateScore();
    }, [firstCard, secondCard])

    const isBlackJack = () => {
        return false;
    }

    const calculateScore = () => {
        let output = 0;
        let hasAs = false;
        if (firstCard) {
            hasAs = firstCard.face == 'AS';
            output += firstCard.value;
        }
        if (secondCard) {
            hasAs = hasAs || secondCard.face == 'AS';
            output += secondCard.value;
        }
        if (output > 21 && hasAs) {
            output -= 10;
        }
        setScore(output);
    }


    return (
        <div className="card">
          <h3>{name}</h3>
          <p>Score : {score}</p>
          <p>
            {firstCard ?
              firstCard.face + ' ' + firstCard.suit
              :
              null
            }
            {secondCard ?
              ' - ' + secondCard.face + ' ' + secondCard.suit
              :
              null
            }
          </p>
        </div>
    )
}

export default Hand;