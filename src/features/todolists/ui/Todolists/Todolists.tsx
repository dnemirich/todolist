import React from "react"
import { Todolist } from "./Todolist/Todolist"
import { Grid2 } from "@mui/material"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

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

  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <>
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
