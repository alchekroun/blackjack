import { useEffect, useState } from "react";

import { Box, Grid, Paper } from "@mui/material";
import Deck from "../lib/Deck";

const Hand = ({ name, gameCards }) => {
    const [handCards, setHandCards] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setHandCards(gameCards == null ? [] : gameCards);
        setScore(Deck.calculateHandScore(gameCards));
    }, [gameCards]);


    return (
        <Grid container>
            <h3>{name}</h3>
            <p>Score : {score}</p>
            {
                handCards.map((card) => (
                    <Paper
                        key={card.face + ' ' + card.suit}
                        elevation={1}
                        sx={{
                            height: 140,
                            width: 100,
                            backgroundColor: '#ccc',
                        }}
                    >
                        {card.face + ' ' + card.suit}
                    </Paper>
                ))
            }
        </Grid >
    )
}

export default Hand;