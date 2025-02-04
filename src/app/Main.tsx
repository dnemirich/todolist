import React, { useEffect } from "react"
import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { Path } from "common/routing/Routing"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(Path.Login)
  }, [isLoggedIn])

  const [addTodo] = useAddTodolistMutation()
  const addTodolist = (title: string) => {
    addTodo(title)
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
