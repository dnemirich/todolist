import React, { useEffect } from "react"
import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { addTodolistTC } from "../features/todolists/model/todolistsSlice"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { selectIsLoggedIn } from "../features/auth/model/authSlice"
import { Path } from "common/routing/Routing"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(Path.Login)
  }, [isLoggedIn])

  const [addTodo] = useAddTodolistMutation()
  const addTodolist = (title: string) => {
    // dispatch(addTodolistTC({ title }))
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
