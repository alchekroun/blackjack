import { useEffect, useState } from "react";

import { Box, Grid, Paper } from "@mui/material";
import Deck from "../lib/Deck";

import '../styles/details.css'

const Hand = ({ name, gameCards }) => {
    const [handCards, setHandCards] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setHandCards(gameCards == null ? [] : gameCards);
        setScore(Deck.calculateHandScore(gameCards));
    }, [gameCards]);


    return (
        <Box>
            <h3>{name}</h3>
            <p>Score : {score}</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                {
                    handCards.map((card) => (
                        <Paper
                            key={card.face + ' ' + card.suit}
                            elevation={1}
                            sx={{
                                backgroundImage: card.down ? `url("/src/assets/svg-cards/back.svg")` : `url(${card.image})`,
                            }}
                            className="handCard"
                        />
                    ))
                }
            </Box>
        </Box >
    )
}

export default Hand;