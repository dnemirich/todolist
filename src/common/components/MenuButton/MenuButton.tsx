import { styled } from "@mui/material"
import { Button } from "@mui/material"


type Props = {
    background?: string
}

export const MenuButton = styled(Button)<Props>(({ background, theme }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    // boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
    borderRadius: '10px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background || theme.palette.secondary.main,
}))