import { useEffect, useState } from "react";

import Slider from '@mui/material/Slider';
import { Box, Stack } from "@mui/material";
import Deck from "../lib/Deck";

const MIN_BET = 10;

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

    const double = () => {
        if (turn == 2 && canDouble()) {
            setPlayerBet(playerBet * 2);
            setPlayerCoins(playerCoins - playerBet);
            setPlayerHand([...playerHand, deck.draw()]);
            setTurn(3);
        }
    }

    const canDouble = () => {
        return Deck.canHit(playerHand) && (playerBet <= playerCoins);
    }

    const split = () => {

    }

    const canSplit = () => {
        return Deck.canHit(playerHand) && Deck.canSplit(playerHand);
    }

    return (
        <Stack>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {turn == 0 ?
                    <Stack spacing={2} direction="row" alignItems="center" sx={{ width: 200 }}>
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
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ width: 200 }}>
                            <button onClick={hit} disabled={!Deck.canHit(playerHand)}>
                                Hit
                            </button>
                            <button onClick={stay}>
                                Stay
                            </button>
                            <button onClick={double} disabled={!canDouble()}>
                                Double
                            </button>
                            <button onClick={split} disabled={!canSplit()}>
                                Split
                            </button>
                        </Stack>
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
    )
}

export default PlayerActions;