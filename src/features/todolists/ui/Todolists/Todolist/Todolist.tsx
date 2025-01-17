import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Paper } from "@mui/material"
import { addTaskTC } from "../../../model/tasksSlice"

import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import type { DomainTodolist } from "../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../app/hooks"
import { useCreateTaskMutation } from "../../../api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  // const dispatch = useAppDispatch()

  const [add] = useCreateTaskMutation()
  const addTask = (title: string) => {
    // dispatch(addTaskTC({ title, todolistId: todolist.id }))
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
