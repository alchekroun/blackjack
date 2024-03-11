import { Grid } from "@mui/material";
import PracticeSetup from "../components/PracticeSetup";
import { useEffect, useState } from "react";
import { Deck, Card } from '../lib/Deck';
import Hand from "../components/Hand";


const PracticePage = () => {

    const [deck, setDeck] = useState(new Deck(4));
    const [gameLive, setGameLive] = useState(false);
    const [cardsToDisplay, setCardsToDisplay] = useState(1);
    const [timerQuizz, setTimerQuizz] = useState(10000); // 10s by default
    const [refreshRateCards, setRefreshRateCards] = useState(5000); // 5s by default
    const [handDrawn, setHandDrawn] = useState([]);
    const [intervalId, setIntervalId] = useState();

    const nextRound = () => {
        if (gameLive) {
            let tmpCards = [];
            for (let i = 0; i < cardsToDisplay; i++) {
                tmpCards.push(deck.draw());
            }
            setHandDrawn(tmpCards);
        }
    }

    useEffect(() => {
        if (gameLive) {
            nextRound();
            const id = setInterval(nextRound, refreshRateCards);
            setIntervalId(id);
        } else {
            setHandDrawn([]);
            clearInterval(intervalId);
        }
    }, [gameLive]);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Hand name={gameLive ? "Live" : "Press Start to Launch"} gameCards={handDrawn} displayScore={false} />
                </Grid>
                <Grid item xs={12} md={2}>
                </Grid>
                <Grid item xs={12} md={8}>
                    <PracticeSetup cardsToDisplay={cardsToDisplay} setCardsToDisplay={setCardsToDisplay} gameLive={gameLive} setGameLive={setGameLive} refreshRateCards={refreshRateCards} setRefreshRateCards={setRefreshRateCards} timerQuizz={timerQuizz} setTimerQuizz={setTimerQuizz} />
                </Grid>
                <Grid item xs={12} md={2}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PracticePage;