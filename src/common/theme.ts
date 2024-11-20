import {createTheme} from "@mui/material";
import {lightGreen} from "@mui/material/colors";
import {ThemeMode} from "../app/app-reducer";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            primary: lightGreen,
            secondary: {
                main: '#3f51b5',
            },
            mode: themeMode
        },
    })
}


