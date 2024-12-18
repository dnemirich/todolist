import { TaskPriority, type TaskStatus } from "../lib/enums"

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type DomainTask = BaseTask & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type BaseTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
