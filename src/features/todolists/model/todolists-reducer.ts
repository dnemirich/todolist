import { v1 } from "uuid"
import type { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import type { AppDispatch, AppThunk, RootState } from "../../../app/store"
import type { Dispatch } from "redux"
import { removeTaskAC } from "./tasks-reducer"

export type FilterValuesType = "all" | "active" | "completed"
// export type TodolistType = {
//   id: string
//   title: string
//   filter: FilterValuesType
// }
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType

const todolistid_1 = v1()
const todolistid_2 = v1()

// const initialState: TodolistType[] = [
//     { id: todolistid_1, title: "What to learn", filter: "all" },
//     { id: todolistid_2, title: "What to buy", filter: "all" }
// ];

const initialState: DomainTodolist[] = []

export const todolistsReducer = (todolists: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
    }
    case "REMOVE-TODOLIST": {
      const { todolistId } = action.payload
      return todolists.filter((tl) => tl.id !== todolistId)
    }
    case "ADD-TODOLIST": {
      const newTodo = { ...action.payload.todolist, filter: "all" as FilterValuesType }
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

// Thunks

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsApi.getTodolists().then((res) => {
    // и диспатчить экшены (action) или другие санки (thunk)
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC =
  (args: { title: string }): AppThunk =>
  (dispatch) => {
    todolistsApi.createTodolist(args.title).then((res) => {
      dispatch(addTodolistAC(res.data.data.item))
    })
  }

export const deleteTodolistTC =
  (args: { id: string }): AppThunk =>
  (dispatch) => {
    todolistsApi.deleteTodolist(args.id).then((res) => {
      dispatch(removeTodolistAC(args.id))
    })
  }

export const updateTodolistTitleTC =
  (args: { id: string; title: string }): AppThunk =>
  (dispatch) => {
    todolistsApi
      .updateTodolist(args)
      .then((res) => dispatch(changeTodolistTitleAC({ title: args.title, todolistId: args.id })))
  }
