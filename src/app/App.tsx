import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme"
import { Header } from "common/components/Header/Header"
import { Main } from "./Main"
import { useAppSelector } from "./hooks"
import { selectThemeMode } from "./app-selectors"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <div className="App">
      <ThemeProvider theme={getTheme(themeMode)}>
        {/* reset browser default styles */}
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}
