import type { Todolist } from "./todolistsApi.types"
import type { Response } from "common/types/types"
import { instance } from "../../../common/instance/instance"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>("todo-lists")
  },

  createTodolist: (title: string) => {
    return instance.post<Response<{ item: Todolist }>>("todo-lists", { title })
  },

  deleteTodolist: (id: string) => {
    return instance.delete<Response>(`todo-lists/${id}`)
  },

  updateTodolist: (payload: { id: string; title: string }) => {
    return instance.put<Response>(`todo-lists/${payload.id}`, { title: payload.title })
  },
}
