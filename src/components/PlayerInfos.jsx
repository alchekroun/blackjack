const PlayerInfos = ({ playerCoins, playerBet, deck }) => {
    return (
        <div className="card">
            <p>Bet : {playerBet} - Stack : {playerCoins} $</p>
            <p>Cards Left : {deck.shoe.length} - Cards Drawns : {deck.trash.length}</p>
        </div>
    )
}

export default PlayerInfos;