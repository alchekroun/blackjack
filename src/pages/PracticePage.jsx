import { Grid } from "@mui/material";
import PracticeSetup from "../components/PracticeSetup";
import { useEffect, useState } from "react";
import { Deck, Card } from '../lib/Deck';
import Hand from "../components/Hand";
import PracticeQuizzDialog from "../components/PracticeQuizzDialog";
import InformationSnack from '../components/InformationSnack'


const PracticePage = () => {

    const [deck, setDeck] = useState(new Deck(4));
    const [gameLive, setGameLive] = useState(false);
    const [cardsToDisplay, setCardsToDisplay] = useState(1);
    const [timerQuizz, setTimerQuizz] = useState(10000); // 10s by default
    const [refreshRateCards, setRefreshRateCards] = useState(5000); // 5s by default
    const [handDrawn, setHandDrawn] = useState([]);
    const [nextRoundIntervalId, setNextRoundIntervalId] = useState(null);
    const [openQuizz, setOpenQuizz] = useState(false);
    const [runningCount, setRunningCount] = useState(0);
    const [outcomeMessage, setOutcomeMessage] = useState("");
    const [showOutcomeSnack, setShowOutcomeSnack] = useState(false);
    const [outcomeMessageType, setOutcomeMessageType] = useState(0);

    const nextRound = () => {
        if (gameLive && nextRoundIntervalId != null) {
            let tmpCards = [];
            for (let i = 0; i < cardsToDisplay; i++) {
                tmpCards.push(deck.draw());
            }
            setHandDrawn(tmpCards);
            setRunningCount(deck.getCCCount());
        }
    }

    const handleOutcomeSnack = (message, type, delay = 2000) => {
        setOutcomeMessage(message);
        setShowOutcomeSnack(true);
        setOutcomeMessageType(type);
        setTimeout(() => {
            setShowOutcomeSnack(false);
        }, delay);
    }

    const handleQuizzAnswer = (playerAnswer) => {
        setOpenQuizz(false);
        if (playerAnswer == runningCount) {
            handleOutcomeSnack("Well done!", 1);
        } else {
            handleOutcomeSnack("Wrong! The running count is: " + runningCount, -1);
        }
        if (gameLive) {
            startDrawingCards();
            startQuizz();
        }
    }

    const startDrawingCards = () => {
        const id = setInterval(nextRound, refreshRateCards);
        setNextRoundIntervalId(id);
    }

    const stopDrawingCards = () => {
        clearInterval(nextRoundIntervalId);
        setNextRoundIntervalId(null);
    }

    const startQuizz = () => {
        setTimeout(() => {
            stopDrawingCards();
            setOpenQuizz(true);
        }, timerQuizz);
    }

    useEffect(() => {
        if (gameLive) {
            nextRound();
            startDrawingCards();
            startQuizz();
        } else {
            stopDrawingCards();
            setHandDrawn([]);
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
            <PracticeQuizzDialog openQuizz={openQuizz} setOpenQuizz={setOpenQuizz} handleClose={handleQuizzAnswer} />
            <InformationSnack informationMessage={outcomeMessage} showInformationSnack={showOutcomeSnack} setShowInformationSnack={setShowOutcomeSnack} informationMessageType={outcomeMessageType} />
        </div>
    )
}

export default PracticePage;