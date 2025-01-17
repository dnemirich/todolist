import type { Todolist } from "./todolistsApi.types"
import type { Response } from "common/types/types"
// import { instance } from "../../../common/instance/instance"

import { baseApi } from "../../../app/baseApi"
import type { DomainTodolist } from "../lib/types/types"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[] /* пишем тип того что вернет трансформация*/, void>({
      query /*этот query не тот же, что выше*/: (args) => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        /* трансформируем пришедшие данные*/
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    addTodolist: builder.mutation<Response<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<Response, string>({
      query: (id) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: builder.mutation<Response, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useLazyGetTodolistsQuery,
  useAddTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistMutation,
} = todolistApi

// export const _todolistsApi = {
//   getTodolists: () => {
//     return instance.get<Todolist[]>("todo-lists")
//   },
//
//   createTodolist: (title: string) => {
//     return instance.post<Response<{ item: Todolist }>>("todo-lists", { title })
//   },
//
//   deleteTodolist: (id: string) => {
//     return instance.delete<Response>(`todo-lists/${id}`)
//   },
//
//   updateTodolist: (payload: { id: string; title: string }) => {
//     return instance.put<Response>(`todo-lists/${payload.id}`, { title: payload.title })
//   },
// }
