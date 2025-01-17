import type { Todolist } from "../../api/todolistsApi.types"
import type { RequestStatus } from "../../../../app/appSlice"
import type { DomainTask } from "../../api/tasksApi.types"

export type FilterValues = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}
