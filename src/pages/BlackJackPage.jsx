import { useEffect, useState } from 'react'
import Cookie from 'universal-cookie'
import '../styles/App.css'

import { Deck, Card } from '../lib/Deck';
import PlayerActions from '../components/PlayerActions'
import PlayerInfos from '../components/PlayerInfos'
import InformationSnack from '../components/InformationSnack'
import { Grid, Stack } from '@mui/material'
import Statistics from '../components/Statistics'
import ConfirmationDialog from '../components/ConfirmationDialog';
import Hand from '../components/Hand'

const BlackJackPage = () => {
    const cookies = new Cookie();
    const [deck, setDeck] = useState(new Deck(4));
    const [activeHand, setActiveHand] = useState(0);
    const [playerHand, setPlayerHand] = useState([]);
    const [playerSplitHands, setPlayerSplitHands] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerBet, setPlayerBet] = useState(0);
    const [playerMoney, setPlayerMoney] = useState(100);
    const [turn, setTurn] = useState(0);
    const [outcomeMessage, setOutcomeMessage] = useState("");
    const [showOutcomeSnack, setShowOutcomeSnack] = useState(false);
    const [outcomeMessageType, setOutcomeMessageType] = useState(0);
    const [isLost, setIsLost] = useState(false);
    const [hasBlackJack, setHasBlackJack] = useState(false);
    const [showInsuranceConfirmation, setShowInsuranceConfirmation] = useState(false);
    const [isInsured, setIsInsured] = useState(false);

    useEffect(() => {
        const savedMoney = cookies.get('playerMoney');
        if (savedMoney != undefined) {
            setPlayerMoney(parseInt(savedMoney));
            if (savedMoney <= 0) {
                setTurn(-1);
                setIsLost(true);
            }
        }
    }, []);

    useEffect(() => {
        nextStep();
    }, [turn]);

    useEffect(() => {
        if (isInsured) {
            setPlayerMoney(playerMoney - (playerBet / 2));
        }
    }, [isInsured])

    const handleOutcomeSnack = (message, type, delay = 2000) => {
        setOutcomeMessage(message);
        setShowOutcomeSnack(true);
        setOutcomeMessageType(type);
        setTimeout(() => {
            setShowOutcomeSnack(false);
        }, delay);
    }

    const handleInsuranceConfirmation = () => {
        if (playerMoney < playerBet / 2) {
            handleOutcomeSnack("Not enough money for insurance", 0, 4000);
        } else {
            setShowInsuranceConfirmation(true);
        }
    }

    const getWinners = (handToCheck) => {
        const playerScore = Deck.calculateHandScore(handToCheck);
        const dealerScore = Deck.calculateHandScore(dealerHand);
        if (playerScore > 21) return -1;
        if (dealerScore > 21 || playerScore > dealerScore) return 1;
        if (playerScore < dealerScore) return -1
        if (playerScore == dealerScore) return 0;
    }

    const handleRoundOutcome = () => {
        let moneyAmountUpdated = playerMoney;
        if (playerSplitHands.length > 0) {
            let messageOutcome = "";
            let moneyWon = 0;
            playerSplitHands.forEach((playerSplitHand, nb) => {
                const outcome = getWinners(playerSplitHand);
                if (outcome == 1) {
                    messageOutcome += "Won hand " + nb + "\n";
                    moneyWon += playerBet * (0.5 * 2); // bet on one hand times two
                } else if (outcome == 0) {
                    messageOutcome += "Draw hand " + nb + "\t";
                    moneyWon += playerBet * 0.5  // bet on one hand
                } else {
                    messageOutcome += "Lost hand " + nb + "\t";
                    moneyWon -= playerBet * (0.5 * 2);  // bet on one hand times two
                }
            });
            if (moneyWon > playerBet) {
                handleOutcomeSnack(messageOutcome + '+' + moneyWon + '$', 1);
                moneyAmountUpdated += moneyWon;
            } else if (moneyWon == playerBet) {
                handleOutcomeSnack(messageOutcome + 'Draw', 0);
                moneyAmountUpdated += moneyWon;
            } else {
                handleOutcomeSnack(messageOutcome + '-' + playerBet + '$', -1);
            }
        } else {
            const winner = getWinners(playerHand);
            if (winner == 1) {
                let moneyWon = playerBet * (hasBlackJack ? 2.5 : 2);
                moneyAmountUpdated += moneyWon;
                handleOutcomeSnack((hasBlackJack ? 'BlackJack!' : 'Won') + '\t+' + moneyWon + '$', 1);
            } else if (winner == -1) {
                handleOutcomeSnack('Loss \t-' + playerBet + '$', -1);
            } else {
                handleOutcomeSnack('Draw', 0);
                moneyAmountUpdated += playerBet;
            }
        }
        if (moneyAmountUpdated < 10) {
            handleLostGame();
            return;
        }
        setPlayerMoney(moneyAmountUpdated);
        cookies.set('playerMoney', moneyAmountUpdated, { path: '/' });
        setTurn(0);
    }

    const handleEndRound = () => {
        setIsInsured(false);
        setHasBlackJack(false);
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerSplitHands([]);
    }

    const handleLostGame = () => {
        setTurn(-1);
        setIsLost(true);
        setIsInsured(false);
        setHasBlackJack(false);
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerSplitHands([]);
        cookies.set('playerMoney', 0, { path: '/' });
    }

    const nextStep = async () => {
        /*
          turn = 0 : Bet
          turn = 1 : Dealer draws
          turn = 2 : Player plays
          turn = 25: Player splits
          turn = 3 : Dealer plays
          turn = 4 : Scores
        */
        if (turn == 1) {
            // Dealer draws for player
            setPlayerHand([deck.draw(), deck.draw()]);
            const firstDealerCard = deck.draw();
            const secondDealerCard = deck.draw();
            secondDealerCard.down = true;
            if (firstDealerCard.face === 'ace') {
                handleInsuranceConfirmation();
            }
            setDealerHand([firstDealerCard, secondDealerCard]);
            setTurn(2);
        } else if (turn == 2 && Deck.hasBlackJack(playerHand)) {
            setHasBlackJack(true);
            setTurn(3);
        } else if (turn == 21 && playerSplitHands.length != 0) {
            setActiveHand(0);
        } else if (turn == 3) {
            let tmpDealerHand = [...dealerHand];
            tmpDealerHand.at(1).down = false;
            setDealerHand(tmpDealerHand);
            if (Deck.hasBlackJack(dealerHand) && isInsured) {
                handleOutcomeSnack("Insurance pays!" + '\t+' + playerBet + "$", 1);
                setPlayerMoney(playerMoney + playerBet);
                await new Promise(r => setTimeout(r, 500));
            } else {
                if (isInsured) {
                    handleOutcomeSnack("Insurance lost!" + '\t-' + playerBet + "$", -1);
                    await new Promise(r => setTimeout(r, 500));
                }
                let tmpDealerHand = [...dealerHand];
                while (Deck.calculateHandScore(tmpDealerHand) <= 16) {
                    tmpDealerHand.push(deck.draw());
                    await new Promise(r => setTimeout(r, 250));
                }
                setDealerHand(tmpDealerHand);
            }
            setTurn(4);
        } else if (turn == 4) {
            await new Promise(r => setTimeout(r, 1000));
            handleRoundOutcome();
            handleEndRound();
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Hand name={"Dealer"} gameCards={dealerHand} />
                </Grid>
                <Grid item xs={12}>
                    {
                        playerSplitHands.length == 0 ?
                            <Hand name={"Player"} gameCards={playerHand} />
                            :
                            <Stack spacing={2} direction="row" justifyContent="center">
                                {
                                    playerSplitHands.map((playerSplitHand, nb) => (
                                        <Hand key={nb + "splithand" + playerBet} name={"Player Hand " + (nb + 1)} gameCards={playerSplitHand} activeHand={activeHand == nb} />
                                    ))
                                }
                            </Stack>
                    }
                </Grid>
                <Grid item xs={12} md={2}>
                    <PlayerInfos playerMoney={playerMoney} playerBet={playerBet} isInsured={isInsured} isLost={isLost} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <PlayerActions deck={deck} turn={turn} setTurn={setTurn} playerBet={playerBet} setPlayerBet={setPlayerBet} playerMoney={playerMoney} setPlayerMoney={setPlayerMoney} activeHand={activeHand} playerHand={playerHand} setActiveHand={setActiveHand} setPlayerHand={setPlayerHand} playerSplitHands={playerSplitHands} setPlayerSplitHands={setPlayerSplitHands} setIsLost={setIsLost} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Statistics deck={deck} dealerHand={dealerHand} playerHand={playerHand} />
                </Grid>
            </Grid>
            <InformationSnack informationMessage={outcomeMessage} showInformationSnack={showOutcomeSnack} setShowInformationSnack={setShowOutcomeSnack} informationMessageType={outcomeMessageType} />
            <ConfirmationDialog confiramtionMessage={"Dealer has an Ace, do you want to take an insurance?"} showConfirmationDialog={showInsuranceConfirmation} setShowConfirmationDialog={setShowInsuranceConfirmation} setResult={setIsInsured} />
        </div>
    )

}

export default BlackJackPage;