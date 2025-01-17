import { List } from "@mui/material"
import { Task } from "./Task/Task"
import { useAppDispatch } from "app/hooks"
import { TaskStatus } from "../../../../lib/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import type { DomainTodolist } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

type ErrorData = {
  status: number
  data: {
    message: string
  }
}

export const Tasks = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const { data: tasks, isLoading, isError, error } = useGetTasksQuery(todolist.id)

  // useEffect(() => {
  //   if (error) {
  //     let errMsg = "Some error occurred"
  //     if ("data" in error) {
  //       const errData = error.data as ErrorData
  //       dispatch(setAppError({ error: errData.data.message }))
  //     }
  //   }
  // }, [error])

  let filteredTasks = tasks?.items

  if (todolist.filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
  }
  if (isLoading) {
    return <TasksSkeleton />
  }

  return filteredTasks?.length === 0 ? (
    <div>Ваш список дел пуст</div>
  ) : (
    <List>
      {filteredTasks?.map((task) => {
        return <Task key={task.id} task={task} todolist={todolist} />
      })}
    </List>
  )
}
