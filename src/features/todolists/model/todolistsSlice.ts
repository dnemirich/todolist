import type { Todolist } from "../api/todolistsApi.types"
import { _todolistsApi } from "../api/todolistsApi"
import type { AppThunk, RootState } from "../../../app/store"
import { changeStatus, type RequestStatus } from "../../../app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "../lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"
// export type TodolistType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

// const initialState: DomainTodolist[] = []

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      const newTodo = {
        ...action.payload.todolist,
        filter: "all" as FilterValuesType,
        entityStatus: "idle" as RequestStatus,
      }
      state.unshift(newTodo)
    }),

    changeTodolistTitle: create.reducer<{ title: string; todolistId: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilter: create.reducer<{ newFilter: FilterValuesType; todolistId: string }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.newFilter
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ entityStatus: RequestStatus; todolistId: string }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.todolistId)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      // 1 variant
      // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      // 2 variant
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    }),
    clearTodosData: create.reducer((state, action) => {
      // 1 variant
      // return []
      // 2 variant
      state.length = 0
    }),
  }),
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  setTodolists,
  clearTodosData,
  removeTodolist,
} = todolistsSlice.actions

export type TodolistsActionsType = ReturnType<typeof todolistsSlice.getInitialState>
export const { selectTodolists } = todolistsSlice.selectors
// Thunks

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  // и диспатчить экшены (action) или другие санки (thunk)
  dispatch(changeStatus({ status: "loading" }))
  _todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(changeStatus({ status: "succeeded" }))
      dispatch(setTodolists({ todolists: res.data }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC =
  (args: { title: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatus({ status: "loading" }))
    _todolistsApi
      .createTodolist(args.title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolist({ todolist: res.data.data.item }))
          dispatch(changeStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const deleteTodolistTC =
  (args: { id: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ todolistId: args.id, entityStatus: "loading" }))
    _todolistsApi
      .deleteTodolist(args.id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolist({ todolistId: args.id }))
          dispatch(changeStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatus({ todolistId: args.id, entityStatus: "failed" }))
      })
  }

export const updateTodolistTitleTC =
  (args: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatus({ status: "loading" }))
    _todolistsApi
      .updateTodolist(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeStatus({ status: "succeeded" }))
          dispatch(changeTodolistTitle({ title: args.title, todolistId: args.id }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
