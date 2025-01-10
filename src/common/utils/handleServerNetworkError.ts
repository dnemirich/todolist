import { changeStatus, setAppError } from "../../app/appSlice"
import type { AppDispatch } from "../../app/store"

export const handleServerNetworkError = (err: { message: string }, dispatch: AppDispatch) => {
  dispatch(setAppError({ error: err.message }))
  dispatch(changeStatus({ status: "failed" }))
}
