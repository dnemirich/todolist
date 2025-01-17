import { createSlice } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

// type InitialState = typeof initialState
// const initialState = {
//   themeMode: "light" as ThemeMode,
//   status: "idle" as RequestStatus,
//   error: null as string | null,
// }

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const appReducer = appSlice.reducer
export const { changeTheme, changeStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors
type AppInitialState = ReturnType<typeof appSlice.getInitialState>

// export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
//   switch (action.type) {
//     case "CHANGE_THEME":
//       return { ...state, themeMode: action.payload.themeMode }
//     case "CHANGE_STATUS":
//       return { ...state, status: action.payload.status }
//     case "SET_ERROR":
//       return { ...state, error: action.payload.error }
//     default:
//       return state
//   }
// }
//
// export const changeThemeAC = (themeMode: ThemeMode) => {
//   return { type: "CHANGE_THEME", payload: { themeMode } } as const
// }
//
// export const changeStatusAC = (status: RequestStatus) => {
//   return { type: "CHANGE_STATUS", payload: { status } } as const
// }
//
// export const setAppErrorAC = (error: string | null) => {
//   return { type: "SET_ERROR", payload: { error } } as const
// }
//
// export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
// export type ChangeStatusActionType = ReturnType<typeof changeStatusAC>
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
//
// // Action types
// type ActionsType = ChangeThemeActionType | ChangeStatusActionType | SetAppErrorActionType
