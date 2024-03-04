import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hand from './components/Hand'

import Deck from './lib/Deck';
import PlayerActions from './components/PlayerActions'
import PlayerInfos from './components/PlayerInfos'

function App() {
  const [deck, setDeck] = useState(new Deck(4));
  const [playerHand, setPlayerHand] = useState([null, null]);
  const [dealerHand, setDealerHand] = useState([null, null]);
  const [playerBet, setPlayerBet] = useState(0);
  const [playerCoins, setPlayerCoins] = useState(100);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    nextStep();
  }, [turn]);


  const nextStep = () => {
    if (turn == 1) {
      // TODO Draw cards for dealer
    }
  }


  return (
    <>
      <h1>BackJack</h1>
      <Hand name={"Dealer"} cards={dealerHand} />
      <Hand name={"Player"} cards={playerHand} />
      <PlayerActions deck={deck} turn={turn} setTurn={setTurn} playerBet={playerBet} setPlayerBet={setPlayerBet} playerCoins={playerCoins} setPlayerCoins={setPlayerCoins} playerHand={playerHand} setPlayerHand={setPlayerHand} dealerHand={dealerHand} setDealerHand={setDealerHand} />
      <PlayerInfos playerCoins={playerCoins} />
      <div className="card">
        <p>Drawer : {deck.drawer.length}</p>
        <p>Trash : {deck.trash.length}</p>
      </div>
    </>
  )
}

export default App
