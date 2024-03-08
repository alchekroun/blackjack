import { useEffect, useState } from 'react'
import './styles/App.css'
import Hand from './components/Hand'

import { Deck, Card } from './lib/Deck';
import PlayerActions from './components/PlayerActions'
import PlayerInfos from './components/PlayerInfos'
import InformationSnack from './components/InformationSnack'
import { Grid } from '@mui/material'
import Statistics from './components/Statistics'
import ConfirmationDialog from './components/ConfirmationDialog';

function App() {
  const [deck, setDeck] = useState(new Deck(4));
  const [playerHand, setPlayerHand] = useState([]);
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

  const getWinners = () => {
    const playerScore = Deck.calculateHandScore(playerHand);
    const dealerScore = Deck.calculateHandScore(dealerHand);
    if (playerScore > 21) return -1;
    if (dealerScore > 21 || playerScore > dealerScore) return 1;
    if (playerScore < dealerScore) return -1
    if (playerScore == dealerScore) return 0;
  }

  const playerLost = () => {
    return playerMoney < 10;
  }

  const nextStep = async () => {
    /*
      turn = 0 : Bet
      turn = 1 : Dealer draws
      turn = 2 : Player plays
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
      const winner = getWinners();
      if (winner == 1) {
        const moneyWon = playerBet * (hasBlackJack ? 2.5 : 2);
        handleOutcomeSnack((hasBlackJack ? 'BlackJack!' : 'Won') + '\t+' + moneyWon + '$', 1);
        setPlayerMoney(playerMoney + moneyWon);
      } else if (winner == -1) {
        handleOutcomeSnack('Loss \t-' + playerBet + '$', -1);
        if (playerLost()) {
          setTurn(-1);
          setIsLost(true);
          setPlayerHand([]);
          setDealerHand([]);
          return;
        }
      } else {
        handleOutcomeSnack('Draw', 0);
        setPlayerMoney(playerMoney + playerBet);
      }
      setTurn(0);
      setIsInsured(false);
      setHasBlackJack(false);
      setPlayerHand([]);
      setDealerHand([]);
    }
  }


  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <h1>BackJack</h1>
          {
            isLost ? <p>No more money</p> : null
          }
        </Grid>
        <Grid item xs={12} >
          <Hand name={"Dealer"} gameCards={dealerHand} />
        </Grid>
        <Grid item xs={12}>
          <Hand name={"Player"} gameCards={playerHand} />
        </Grid>
        <Grid item xs={12} md={2}>
          <PlayerInfos playerMoney={playerMoney} playerBet={playerBet} isInsured={isInsured} />
        </Grid>
        <Grid item xs={12} md={8}>
          <PlayerActions deck={deck} turn={turn} setTurn={setTurn} playerBet={playerBet} setPlayerBet={setPlayerBet} playerMoney={playerMoney} setPlayerMoney={setPlayerMoney} playerHand={playerHand} setPlayerHand={setPlayerHand} />
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

export default App
