import "./App.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme"
import { Header } from "common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "./hooks"
import { selectThemeMode } from "./appSlice"
import { ErrorSnackbar } from "common/components"
import { Routing } from "common/routing/Routing"
import { useEffect } from "react"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model/authSlice"

import s from "./App.module.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

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
