import type { BaseTask, GetTasksResponse, DomainTask } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import type { Response } from "common/types"

export const tasksApi = {
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
