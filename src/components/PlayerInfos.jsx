const PlayerInfos = ({ playerCoins, playerBet }) => {
    return (
        <div className="card">
            <p>Bet : {playerBet} - Stack : {playerCoins} $</p>
        </div>
    )
}

export default PlayerInfos;