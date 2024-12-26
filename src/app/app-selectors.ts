import type { RootState } from "./store"
import type { RequestStatus, ThemeMode } from "./app-reducer"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
export const selectStatus = (state: RootState): RequestStatus => state.app.status
export const selectError = (state: RootState): string | null => state.app.error
