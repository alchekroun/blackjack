import { useState } from "react";

import Slider from '@mui/material/Slider';

const PlayerActions = ({
    deck,
    turn,
    playerBet,
    setPlayerBet,
    playerCoins,
    setPlayerCoins,
    setTurn,
    playerHand,
    setPlayerHand,
    dealerHand,
    setDealerHand
}) => {

    const [betToPlace, setBetToPlace] = useState(1);

    const placeBet = () => {
        setPlayerBet(betToPlace);
        setPlayerCoins(playerCoins - betToPlace);
        setTurn(turn + 1);
    }

    const checkOutDraw = () => {
        if (playerHand[0] && playerHand[1] && dealerHand[0] && dealerHand[1]) {
            setDealerHand([null, null]);
            setPlayerHand([null, null]);
            setTurn(false);
            return true
        }
        return false;
    }

    const drawCard = () => {
        if (checkOutDraw()) return;
        const cardDrawn = deck.draw();
        if (turn) {
            setPlayerHand(playerHand[0] == null ? [cardDrawn, null] : [playerHand[0], cardDrawn]);
        } else {
            setDealerHand(dealerHand[0] == null ? [cardDrawn, null] : [dealerHand[0], cardDrawn]);
        }
        setTurn(!turn);
    }

    return (
        <div className="card">
            {
                turn == 0 ?
                    <div>
                        <Slider
                            defaultValue={20}
                            step={10}
                            valueLabelDisplay="auto"
                            onChange={(e) => setBetToPlace(e.target.value)}
                            max={playerCoins}
                            min={10}
                        />
                        <button onClick={placeBet}>
                            Bet
                        </button>
                    </div>
                    :
                    null
            }
            {
                turn == 1 ?
                    <button onClick={drawCard}>
                        Draw
                    </button>
                    :
                    null
            }
            <button onClick={() => deck.shuffle()}>
                Shuffle
            </button>
        </div>
    )
}

export default PlayerActions;