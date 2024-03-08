import { useEffect, useState } from "react";

import Slider from '@mui/material/Slider';
import { Box, Stack } from "@mui/material";
import { Deck } from "../lib/Deck";

import '../styles/details.css'

const MIN_BET = 10;

const PlayerActions = ({
    deck,
    turn,
    playerBet,
    setPlayerBet,
    playerMoney,
    setPlayerMoney,
    setTurn,
    activeHand,
    setActiveHand,
    playerHand,
    setPlayerHand,
    playerSplitHands,
    setPlayerSplitHands,
    setIsLost
}) => {

    const [betToPlace, setBetToPlace] = useState(MIN_BET);

    useEffect(() => {
        if (turn === 2 && Deck.calculateHandScore(playerHand) >= 21) {
            setTurn(3);
        } else if (turn === 21 && playerSplitHands.length > 0 && Deck.calculateHandScore(playerSplitHands[activeHand]) >= 21) {
            nextTurnOrNextActiveHand();
        }
    }, [playerHand, playerSplitHands]);

    const placeBet = () => {
        setPlayerBet(betToPlace);
        setPlayerMoney(playerMoney - betToPlace);
        setTurn(1);
    }

    const nextTurnOrNextActiveHand = () => {
        if (activeHand >= playerSplitHands.length - 1) {
            setTurn(3);
            setActiveHand(0);
        } else {
            setActiveHand(activeHand + 1);
        }
    }

    const getActiveHand = () => {
        return playerSplitHands.length > 0 ? playerSplitHands[activeHand] : playerHand;
    }

    const hit = () => {
        if (turn === 2 && Deck.canHit(playerHand)) {
            setPlayerHand([...playerHand, deck.draw()]);
        } else if (turn === 21 && playerSplitHands.length > 0 && Deck.canHit(playerSplitHands[activeHand])) {
            const tmpPlayerSplitHands = [...playerSplitHands];
            tmpPlayerSplitHands[activeHand].push(deck.draw());
            setPlayerSplitHands(tmpPlayerSplitHands);
        } else if (turn === 2 && !Deck.canHit(playerHand)) {
            setTurn(3);
        }
    }

    const stay = () => {
        if (turn === 2) {
            setTurn(3);
        } else if (turn === 21) {
            nextTurnOrNextActiveHand();
        }
    }

    const double = () => {
        if (turn === 2 && canDouble()) {
            setPlayerBet(playerBet * 2);
            setPlayerMoney(playerMoney - playerBet);
            setPlayerHand([...playerHand, deck.draw()]);
            setTurn(3);
        }
    }

    const canDouble = () => {
        const handToCheck = getActiveHand();
        return Deck.canHit(handToCheck) && (handToCheck.length === 2) && (playerBet <= playerMoney);
    }

    const split = () => {
        if (turn === 2 && canSplit()) {
            const splitHands = [[playerHand[0], deck.draw()], [playerHand[1], deck.draw()]];
            setPlayerSplitHands(splitHands);
            setPlayerBet(playerBet * 2);
            setPlayerMoney(playerMoney - playerBet);
            setTurn(21);
        }
    }

    const canSplit = () => {
        const handToCheck = getActiveHand();
        return Deck.canHit(handToCheck) && Deck.canSplit(handToCheck) && (playerBet <= playerMoney);
    }

    const rebuy = () => {
        setPlayerMoney(100);
        setTurn(0);
        setIsLost(false);
    }

    return (
        <Stack className="playerActions">
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {turn === 0 ?
                    <Stack spacing={2} direction="row" alignItems="center" sx={{ width: 200 }}>
                        <Slider
                            defaultValue={20}
                            step={10}
                            valueLabelDisplay="auto"
                            onChange={(e) => setBetToPlace(e.target.value)}
                            max={playerMoney}
                            min={MIN_BET}
                            color="warning"
                        />
                        <button onClick={placeBet}>
                            Bet
                        </button>
                    </Stack>
                    :
                    null
                }
                {
                    turn === 2 || turn === 21 ?
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ width: 200 }}>
                            <button onClick={hit} disabled={!Deck.canHit(getActiveHand())}>
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
                {
                    turn === -1 ?
                        <button onClick={rebuy}>
                            Rebuy
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
    )
}

export default PlayerActions;