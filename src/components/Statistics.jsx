import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Statistics = ({ deck, dealerHand, playerHand }) => {

    const [runningCount, setRunningCount] = useState(0);
    const [trueCount, setTrueCount] = useState(0);

    useEffect(() => {
        const count = deck.getCCCount();
        const trueCount = Math.floor(count / (deck.shoe.length % 54));
        console.log(count);
        console.log((deck.shoe % 54));
        console.log(trueCount);
        setRunningCount(count);
        setTrueCount(trueCount)
    }, [deck, playerHand, dealerHand]);

    return (
        <Box>
            <p color={runningCount > 15 ? 'orange' : 'green'}>Running count : {runningCount}</p>
            <p color={trueCount > 15 ? 'orange' : 'green'}>True count : {trueCount}</p>
        </Box>
    )
}

export default Statistics;