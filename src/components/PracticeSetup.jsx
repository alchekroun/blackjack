import { Box, Stack, Slider } from "@mui/material";

const PracticeSetup = ({ cardsToDisplay, setCardsToDisplay: setCardsToDisplay, gameLive, setGameLive, refreshRateCards, setRefreshRateCards, timerQuizz, setTimerQuizz }) => {
    return (
        <Stack className="playerActions">
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    gameLive ?
                        <button className="action-button" onClick={() => setGameLive(false)}>
                            Stop
                        </button>
                        :
                        <Stack spacing={2} direction="row" alignItems="center" sx={{ width: 500 }}>
                            <span>Cards by rounds:</span>
                            <Slider
                                step={1}
                                onChange={(e) => setCardsToDisplay(e.target.value)}
                                max={5}
                                min={1}
                                color="warning"
                                sx={{ width: 100 }}
                            />
                            <span>{cardsToDisplay}</span>
                            <button className="action-button" onClick={() => setGameLive(true)}>
                                Launch
                            </button>
                        </Stack>

                }
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    gameLive ?
                        null
                        :
                        <Stack spacing={2} direction="row" alignItems="center" sx={{ width: 500 }}>
                            <span>Refresh rate:</span>
                            <Slider
                                step={1}
                                onChange={(e) => setRefreshRateCards(e.target.value * 1000)}
                                max={10}
                                min={2}
                                color="warning"
                                sx={{ width: 100 }}
                            />
                            <span>{refreshRateCards / 1000}s</span>
                        </Stack>

                }
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    gameLive ?
                        null
                        :
                        <Stack spacing={2} direction="row" alignItems="center" sx={{ width: 500 }}>
                            <span>Count quizz each:</span>
                            <Slider
                                step={1}
                                onChange={(e) => setTimerQuizz(e.target.value * 1000)}
                                max={10}
                                min={1}
                                color="warning"
                                sx={{ width: 100 }}
                            />
                            <span>{timerQuizz / 1000}s</span>
                        </Stack>

                }
            </Box>
        </Stack>
    )
}

export default PracticeSetup;