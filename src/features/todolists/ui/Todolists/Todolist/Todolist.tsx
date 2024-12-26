import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Paper } from "@mui/material"
import { addTaskAC, addTaskTC } from "../../../model/tasks-reducer"

import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import type { DomainTodolist } from "../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../app/hooks"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTask = (title: string) => {
    dispatch(addTaskTC({ title, todolistId: todolist.id }))
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
