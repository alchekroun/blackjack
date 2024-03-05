import { useEffect, useState } from "react";

import Slider from '@mui/material/Slider';
import { Box, Stack } from "@mui/material";
import Deck from "../lib/Deck";

const MIN_BET = 10;

const PlayerActions = ({
    deck,
    turn,
    setPlayerBet,
    playerCoins,
    setPlayerCoins,
    setTurn,
    playerHand,
    setPlayerHand,
}) => {

    const [betToPlace, setBetToPlace] = useState(MIN_BET);

    useEffect(() => {
        if (turn == 2 && Deck.calculateHandScore(playerHand) >= 21) {
            setTurn(3);
        }
    }, [playerHand]);

    const placeBet = () => {
        setPlayerBet(betToPlace);
        setPlayerCoins(playerCoins - betToPlace);
        setTurn(1);
    }

    const hit = () => {
        if (turn == 2 && Deck.canHit(playerHand)) {
            setPlayerHand([...playerHand, deck.draw()]);
        } else if (turn == 2 && !Deck.canHit(playerHand)) {
            setTurn(3);
        }
    }

    const stay = () => {
        setTurn(3);
    }

    return (
        <Stack >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {turn == 0 ?
                    <Stack spacing={2} direction="row" alignItems="center"  sx={{ width: 200 }}>
                        <Slider
                            defaultValue={20}
                            step={10}
                            valueLabelDisplay="auto"
                            onChange={(e) => setBetToPlace(e.target.value)}
                            max={playerCoins}
                            min={MIN_BET}
                        />
                        <button onClick={placeBet}>
                            Bet
                        </button>
                    </Stack>
                    :
                    null
                }
                {
                    turn == 2 ?
                        <button onClick={hit}>
                            Hit
                        </button>
                        :
                        null
                }
                {
                    turn == 2 ?
                        <button onClick={stay}>
                            Stay
                        </button>
                        :
                        null
                }

            </Box>
            <Box>
                <button onClick={() => deck.shuffle()}>
                    Shuffle
                </button>
            </Box>
        </Stack>
        /*<Box>*/
    )
}

export default PlayerActions;