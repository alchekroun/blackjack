import { Box } from "@mui/material";

const PlayerInfos = ({ playerMoney, playerBet, isInsured, isLost }) => {
    return (
        <Box>
            {
                isLost ?
                    <p>No more money</p>
                    :
                    <div>
                        < p > Bet : {playerBet} - Stack : {playerMoney} $</p>
                        {isInsured ? <p>Insured</p> : null}
                    </div>
            }
        </Box >
    )
}

export default PlayerInfos;