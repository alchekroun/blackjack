import '../styles/header.css'
import { Stack } from '@mui/material'

const Header = () => {
    return (
        <header>
            <Stack direction='row' spacing={2} alignItems={"center"} justifyItems={"flex-start"}>
                <img src="/svg-cards/jack_of_spades2.svg" alt="Logo" />
                <span>BlackJack v0.4</span>
                <a href='/'>Game</a>
                <a href='/practice'>Counting Card Practice</a>
            </Stack>
        </header>
    )
}

export default Header;