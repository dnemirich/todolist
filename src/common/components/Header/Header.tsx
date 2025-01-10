import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { MenuButton } from "../MenuButton/MenuButton"
import { changeTheme } from "../../../app/appSlice"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectStatus, selectThemeMode } from "../../../app/appSlice"
import { selectIsLoggedIn } from "../../../features/auth/model/authSlice"
import { logoutTC } from "../../../features/auth/model/authSlice"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const logoutHandler = () => {
    dispatch(logoutTC())
  }
  return (
    <AppBar position="static" sx={{ marginBottom: "50px" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <Menu />
        </IconButton>
        <Box>
          {isLoggedIn && (
            <MenuButton color="inherit" onClick={logoutHandler}>
              Logout
            </MenuButton>
          )}
          <MenuButton color="inherit">FAQ</MenuButton>
          <Switch checked={themeMode === "dark"} onChange={changeModeHandler} />
        </Box>
      </Toolbar>
      {status === "loading" && <LinearProgress color={"secondary"} />}
    </AppBar>
  )
}
