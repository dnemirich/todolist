import type { Inputs } from "../ui/Login/Login"
import type { Dispatch } from "redux"
import { changeStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authApi"
import { ResultCode } from "../../todolists/lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTodosDataAC } from "../../todolists/model/todolists-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case "SET_INITIALIZED":
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}

export const setInitialized = (isInitialized: boolean) => {
  return { type: "SET_INITIALIZED", payload: { isInitialized } } as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setInitialized>

// thunks
export const loginTC = (data: Inputs) => (dispatch: Dispatch) => {
  dispatch(changeStatusAC("loading"))

  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
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
  dispatch(changeStatusAC("loading"))

  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(false))
        dispatch(clearTodosDataAC())
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
  dispatch(changeStatusAC("loading"))

  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
        dispatch(setInitialized(true))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => dispatch(setInitialized(true)))
}
