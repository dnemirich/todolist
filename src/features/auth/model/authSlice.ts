import type { Inputs } from "../ui/Login/Login"
import type { Dispatch } from "redux"
import { changeStatus } from "../../../app/appSlice"
import { authApi } from "../api/authApi"
import { ResultCode } from "../../todolists/lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTodosData } from "../../todolists/model/todolistsSlice"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../../app/store"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  // новый вариант написания редьюсеров
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    setInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
  }),
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectIsInitialized: (state) => state.isInitialized,
  },
  // reducers: {
  //   setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
  //     // return {...state, isLoggedIn: action.payload.isLoggedIn} // как писали раньше в редьюсере
  //     state.isLoggedIn = action.payload.isLoggedIn // в RTK делаем мутабельно!
  //   },
  //   setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
  //     state.isInitialized = action.payload.isInitialized
  //   },
  // },
})
//достаем редьюсер и AC из слайса
export const authReducer = authSlice.reducer
export const { setIsLoggedIn, setInitialized } = authSlice.actions
export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
  dispatch(changeStatus({ status: "loading" }))

  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(changeStatus({ status: "loading" }))

  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(clearTodosData())
        localStorage.removeItem("sn-token")
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(changeStatus({ status: "loading" }))

  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatus({ status: "succeeded" }))
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setInitialized({ isInitialized: true }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => dispatch(setInitialized({ isInitialized: true })))
}
