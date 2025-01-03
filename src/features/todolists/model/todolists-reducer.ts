import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppThunk } from "../../../app/store"
import { changeStatusAC, type RequestStatus } from "../../../app/app-reducer"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "../lib/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"

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

// const todolistid_1 = v1()
// const todolistid_2 = v1()
//
// // const initialState: TodolistType[] = [
// //     { id: todolistid_1, title: "What to learn", filter: "all" },
// //     { id: todolistid_2, title: "What to buy", filter: "all" }
// // ];

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
  todolists: DomainTodolist[] = initialState,
  action: TodolistsActionsType,
): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }
    case "REMOVE-TODOLIST": {
      const { todolistId } = action.payload
      return todolists.filter((tl) => tl.id !== todolistId)
    }
    case "ADD-TODOLIST": {
      const newTodo = {
        ...action.payload.todolist,
        filter: "all" as FilterValuesType,
        entityStatus: "idle" as RequestStatus,
      }
      return [newTodo, ...todolists]
    }
    case "CHANGE-TODOLIST-TITLE": {
      const { title, todolistId } = action.payload
      return todolists.map((tl) => (tl.id === todolistId ? { ...tl, title } : tl))
    }
    case "CHANGE-TODOLIST-FILTER": {
      const { newFilter, todolistId } = action.payload
      return todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter: newFilter } : tl))
    }
    case "CHANGE-TODOLIST-STATUS": {
      return todolists.map((tl) =>
        tl.id === action.payload.todolistId ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
      )
    }
    case "CLEAR-DATA": {
      return []
    }
    default:
      return todolists
  }
}

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const
}

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const
}

export const changeTodolistTitleAC = (payload: { title: string; todolistId: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { newFilter: FilterValuesType; todolistId: string }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const
}

export const changeTodolistEntityStatusAC = (payload: { todolistId: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-STATUS", payload } as const
}

export const clearTodosDataAC = () => {
  return { type: "CLEAR-DATA" } as const
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>

export type TodolistsActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType
  | ClearTodosDataActionType

// Thunks

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  // и диспатчить экшены (action) или другие санки (thunk)
  dispatch(changeStatusAC("loading"))
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(changeStatusAC("succeeded"))
      dispatch(setTodolistsAC(res.data))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC =
  (args: { title: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatusAC("loading"))
    todolistsApi
      .createTodolist(args.title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTodolistAC(res.data.data.item))
          dispatch(changeStatusAC("succeeded"))
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
    dispatch(changeStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC({ todolistId: args.id, entityStatus: "loading" }))
    todolistsApi
      .deleteTodolist(args.id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodolistAC(args.id))
          dispatch(changeStatusAC("succeeded"))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatusAC({ todolistId: args.id, entityStatus: "failed" }))
      })
  }

export const updateTodolistTitleTC =
  (args: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatusAC("loading"))
    todolistsApi
      .updateTodolist(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeStatusAC("succeeded"))
          dispatch(changeTodolistTitleAC({ title: args.title, todolistId: args.id }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
