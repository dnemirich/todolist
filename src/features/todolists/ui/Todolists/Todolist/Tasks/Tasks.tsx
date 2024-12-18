import { List } from "@mui/material"
import { fetchTasksTC } from "../../../../model/tasks-reducer"
import { type DomainTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task/Task"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { selectTasks } from "../../../../model/tasks-selectors"
import { useEffect } from "react"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../lib/enums"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  let filteredTasks: Array<DomainTask> = tasks[todolist.id]

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  if (todolist.filter === "active") {
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.status === TaskStatus.Completed)
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
