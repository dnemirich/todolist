import { AppBar, Box, IconButton, LinearProgress, Switch, Toolbar } from "@mui/material"
import { Menu } from "@mui/icons-material"
import { MenuButton } from "../MenuButton/MenuButton"
import { changeTheme, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "../../../features/todolists/lib/enums"
import { baseApi } from "../../../app/baseApi"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem("sn-token")
          // dispatch(baseApi.util.resetApiState()) // первый вариант зачищения стейта
        }
      })
      .then((res) => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"])) // второй способ зачистить стейт - инвалидировать конкретные теги
      })
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
