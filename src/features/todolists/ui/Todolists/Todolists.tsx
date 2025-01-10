import React, { useEffect, useState } from "react"
import { Todolist } from "./Todolist/Todolist"
import { Grid2 } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"

import { fetchTodolistsTC, selectTodolists } from "../../model/todolistsSlice"
import { useGetTodolistsQuery, useLazyGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = () => {
  // const todolists = useAppSelector(selectTodolists)
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  // const [skip, setSkip] = useState(true)
  // const { data: todolists, error, isLoading } = useGetTodolistsQuery(undefined, { skip })
  // const [trigger, { data: todolists, error, isLoading }] = useLazyGetTodolistsQuery()
  //
  // const fetchTodolistsHandler = () => {
  //   // setSkip(false)
  //   trigger()
  // }

  const { data: todolists, error, isLoading } = useGetTodolistsQuery()

  return (
    <>
      {/*<div>*/}
      {/*  <button onClick={fetchTodolistsHandler}> Загрузить тудулисты</button>*/}
      {/*</div>*/}
      {todolists?.map((tl) => {
        return (
          <Grid2 key={tl.id}>
            <Todolist todolist={tl} />
          </Grid2>
        )
      })}
    </>
  )
}
