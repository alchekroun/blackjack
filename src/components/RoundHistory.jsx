import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const RoundHistory = ({ handHistory }) => {

    const getHand = (hand) => {
        return (
            <Stack direction="row">
                {hand ? hand.map(card => (
                    <img src={card.image} width={50} height={50} />
                )) : null}
            </Stack>
        );
    }

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Dealer</TableCell>
                        <TableCell>Player</TableCell>
                        <TableCell>PNL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {handHistory.map((dealerHand, playerHand, pnl) => (
                        <TableRow>
                            <TableCell>{getHand(dealerHand)}</TableCell>
                            <TableCell>{getHand(playerHand)}</TableCell>
                            <TableCell>{pnl}$</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RoundHistory;