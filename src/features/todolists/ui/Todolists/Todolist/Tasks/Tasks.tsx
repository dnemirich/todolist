import { List } from "@mui/material"
import { fetchTasksTC, selectTasks } from "../../../../model/tasksSlice"
import { type DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { useAppDispatch, useAppSelector } from "app/hooks"
import { useEffect } from "react"
import type { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../lib/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  // const tasks = useAppSelector(selectTasks)
  // const dispatch = useAppDispatch()
  // let filteredTasks: Array<DomainTask> = tasks[todolist.id]
  //
  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  const { data: tasks } = useGetTasksQuery(todolist.id)
  let filteredTasks = tasks?.items

  if (todolist.filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (todolist.filter === "completed") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.Completed)
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
