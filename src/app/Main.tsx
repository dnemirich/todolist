import React from "react"
import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { addTodolistAC, addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch } from "./hooks"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC({ title }))
  }

  return (
    <Container>
      <Grid2 container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  )
}
