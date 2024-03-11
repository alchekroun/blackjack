import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Statistics = ({ deck, dealerHand, playerHand }) => {

    const [showStatistics, setShowStatistics] = useState(true);
    const [runningCount, setRunningCount] = useState(0);
    const [trueCount, setTrueCount] = useState(0);
    const [getTenPlayerProba, setGetTenPlayerProba] = useState(0);
    const [getTenDealerProba, setGetTenDealerProba] = useState(0);

    useEffect(() => {
        countingCards();
        setGetTenPlayerProba(deck.getTenProba());
        setGetTenDealerProba(deck.getTenProba(true));
    }, [deck, playerHand, dealerHand]);

    const countingCards = () => {
        const count = deck.getCCCount();
        const trueCount = Math.floor(count / ((deck.shoe.length % 54) + 1));
        setRunningCount(count);
        setTrueCount(trueCount)
    }

    return (
        <Box>
            <p color={runningCount > 15 ? 'orange' : 'green'}>Running count : {runningCount}</p>
            <p color={trueCount > 15 ? 'orange' : 'green'}>True count : {trueCount}</p>
            <p>P_player(10) : {(getTenPlayerProba * 100).toFixed(2)} %</p>
            <p>P_dealer(10) : {(getTenDealerProba * 100).toFixed(2)} %</p>
            <p>Cards Left : {deck.shoe.length} - Cards Drawns : {deck.trash.length}</p>
            <button>
                <img src="/settings_orange.svg" alt="logo-settings" width={25} height={25} />
            </button>
        </Box>
    )
}

export default Statistics;