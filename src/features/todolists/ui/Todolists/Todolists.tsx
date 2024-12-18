import React, { useEffect } from "react"
import { Todolist } from "./Todolist/Todolist"
import { Grid2 } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectTodolists } from "../../model/todolists-selectors"
import { fetchTodolistsTC } from "../../model/todolists-reducer"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Todolist todolist={tl} />
          </Grid2>
        )
      })}
    </>
  )
}
