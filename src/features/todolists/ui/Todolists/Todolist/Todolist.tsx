import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Paper } from "@mui/material"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { useCreateTaskMutation } from "../../../api/tasksApi"
import type { DomainTodolist } from "../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [add] = useCreateTaskMutation()
  const addTask = (title: string) => {
    add({ title, todolistId: todolist.id })
  }

  return (
    <Paper sx={{ p: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </Paper>
  )
}
