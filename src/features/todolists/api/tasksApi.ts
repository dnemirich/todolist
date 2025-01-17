import type { BaseTask, GetTasksResponse, DomainTask } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import type { Response } from "common/types"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (id) => `todo-lists/${id}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Response<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        method: "POST",
        url: `todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    removeTask: builder.mutation<Response, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        method: "DELETE",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<
      Response<{
        item: DomainTask
      }>,
      { taskId: string; todolistId: string; model: BaseTask }
    >({
      query: ({ taskId, todolistId, model }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks: (id: string) => {
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`)
  },

  createTask: (payload: { title: string; todolistId: string }) => {
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${payload.todolistId}/tasks`, {
      title: payload.title,
    })
  },

  removeTask: (payload: { taskId: string; todolistId: string }) => {
    return instance.delete<Response>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },

  updateTask: (payload: { task: DomainTask; partialTask: Partial<BaseTask> }) => {
    const model: BaseTask = {
      ...payload.task,
      ...payload.partialTask,
    }

    return instance.put<
      Response<{
        item: DomainTask
      }>
    >(`todo-lists/${payload.task.todoListId}/tasks/${payload.task.id}`, model)
  },
}
