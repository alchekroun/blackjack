import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Hand from './components/Hand'

import Deck from './lib/Deck';
import PlayerActions from './components/PlayerActions'
import PlayerInfos from './components/PlayerInfos'
import InformationModal from './components/InformationModal'
import { Grid } from '@mui/material'

function App() {
  const [deck, setDeck] = useState(new Deck(4));
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerBet, setPlayerBet] = useState(0);
  const [playerCoins, setPlayerCoins] = useState(100);
  const [turn, setTurn] = useState(0);
  const [informationMessage, setInformationMessage] = useState("");
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [isLost, setIsLost] = useState(false);

  useEffect(() => {
    nextStep();
  }, [turn]);

  const handleInformationModal = (message) => {
    setInformationMessage(message);
    setShowInformationModal(true);
    setTimeout(() => {
      setShowInformationModal(false);
    }, 2000);
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
    return playerCoins < 10;
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
      setDealerHand([deck.draw(), deck.draw()]);
      setTurn(turn + 1);
    } else if (turn == 3) {
      let tmpDealerHand = [...dealerHand];
      while (Deck.calculateHandScore(tmpDealerHand) <= 16) {
        tmpDealerHand.push(deck.draw());
      }
      setDealerHand(tmpDealerHand);
      setTurn(turn + 1);
    } else if (turn == 4) {
      await new Promise(r => setTimeout(r, 1000));
      const winner = getWinners();
      if (winner == 1) {
        handleInformationModal('Win');
        setPlayerCoins(playerCoins + playerBet * 2);
      } else if (winner == -1) {
        handleInformationModal('Lose');
        if (playerLost()) {
          setTurn(-1);
          setIsLost(true);
          setPlayerHand([]);
          setDealerHand([]);
          return;
        }
      } else {
        handleInformationModal('Draw');
        setPlayerCoins(playerCoins + playerBet);
      }
      setTurn(0);
      setPlayerHand([]);
      setDealerHand([]);
    }
  }


  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <h1>BackJack</h1>
          {
            isLost ? <p>No more money</p> : null
          }
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Hand name={"Dealer"} gameCards={dealerHand} />
        </Grid>
        <Grid item xs={12}>
          <Hand name={"Player"} gameCards={playerHand} />
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          <PlayerActions deck={deck} turn={turn} setTurn={setTurn} playerBet={playerBet} setPlayerBet={setPlayerBet} playerCoins={playerCoins} setPlayerCoins={setPlayerCoins} playerHand={playerHand} setPlayerHand={setPlayerHand} />
        </Grid>
        <Grid item xs={2}>
          <PlayerInfos playerCoins={playerCoins} playerBet={playerBet} deck={deck} />
        </Grid>
      </Grid>
      <InformationModal informationMessage={informationMessage} showInformationModal={showInformationModal} />
    </div>
  )
}

export default App
