const PlayerInfos = ({ playerMoney, playerBet, isInsured }) => {
    return (
        <div className="card">
            <p>Bet : {playerBet} - Stack : {playerMoney} $</p>
            {isInsured ? <p>Insured</p> : null}
        </div>
    )
}

export default PlayerInfos;