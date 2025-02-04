import { type UnknownAction } from "redux"
import { appReducer, appSlice } from "./appSlice"
import { type ThunkAction, type ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//   tasks: tasksReducer, // {}
//   todolists: todolistsReducer, // []
//   app: appReducer,
//   auth: authReducer,
// })
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
// добавили middleware, чтобы диспатч мог обрабатывать не только простые объекты, но и функции thunk

// RTK version:
export const store = configureStore({
  reducer: {
    // [tasksSlice.name]: tasksReducer, // {}
    // [todolistsSlice.name]: todolistsReducer, // []
    [appSlice.name]: appReducer,
    // [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(
  store.dispatch,
) /* подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect), чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения*/

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
// export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
// export type AppDispatch = typeof store.dispatch // RTK version
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
