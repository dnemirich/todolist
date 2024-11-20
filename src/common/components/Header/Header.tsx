import {AppBar, Box, IconButton, Switch, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "../MenuButton/MenuButton";
import {changeThemeAC} from "../../../app/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectThemeMode} from "../../../app/app-selectors";


export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode);

    const dispatch = useAppDispatch();

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    return (
        <AppBar position="static">
            <Toolbar sx={{justifyContent: "space-between"}}>
                <IconButton color="inherit">
                    <Menu/>
                </IconButton>
                <Box>
                    <MenuButton color="inherit">Login</MenuButton>
                    <MenuButton color="inherit">Logout</MenuButton>
                    <MenuButton color="inherit">FAQ</MenuButton>
                    <Switch checked={themeMode === "dark"} onChange={changeModeHandler}/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
