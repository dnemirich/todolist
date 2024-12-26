import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { MenuButton } from "../MenuButton/MenuButton"
import { changeThemeAC } from "../../../app/app-reducer"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectStatus, selectThemeMode } from "../../../app/app-selectors"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }
  return (
    <AppBar position="static" sx={{ marginBottom: "50px" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <Menu />
        </IconButton>
        <Box>
          <MenuButton color="inherit">Login</MenuButton>
          <MenuButton color="inherit">Logout</MenuButton>
          <MenuButton color="inherit">FAQ</MenuButton>
          <Switch checked={themeMode === "dark"} onChange={changeModeHandler} />
        </Box>
      </Toolbar>
      {status === "loading" && <LinearProgress color={"secondary"} />}
    </AppBar>
  )
}
