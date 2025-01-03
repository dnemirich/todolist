import React, { useEffect } from "react"
import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { addTodolistAC, addTodolistTC } from "../features/todolists/model/todolists-reducer"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useNavigate } from "react-router"
import { selectIsLoggedIn } from "../features/auth/model/auth-selectors"
import { Path } from "common/routing/Routing"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(Path.Login)
  }, [isLoggedIn])

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
