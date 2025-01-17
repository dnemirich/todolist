import "./App.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme"
import { Header } from "common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "./hooks"
import { selectThemeMode, setIsLoggedIn } from "./appSlice"
import { ErrorSnackbar } from "common/components"
import { Routing } from "common/routing/Routing"
import { useEffect, useState } from "react"
// import { initializeAppTC, selectIsInitialized, setIsLoggedIn } from "../features/auth/model/authSlice"

import s from "./App.module.css"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "../features/todolists/lib/enums"

export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  // const isInitialized = useAppSelector(selectIsInitialized)

  // useEffect(() => {
  //   dispatch(initializeAppTC())
  // }, [])

  const { data, isLoading } = useMeQuery()
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        {/* reset browser default styles */}
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}
