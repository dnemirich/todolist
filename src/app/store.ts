import { applyMiddleware, combineReducers, legacy_createStore, type UnknownAction } from "redux"
import { type SetTasksActionType, type TasksActionsType, tasksReducer } from "../features/todolists/model/tasks-reducer"
import { type TodolistsActionsType, todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-reducer"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer, // {}
  todolists: todolistsReducer, // []
  app: appReducer,
  auth: authReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
// добавили middleware, чтобы диспатч мог обрабатывать не только простые объекты, но и функции thunk

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
