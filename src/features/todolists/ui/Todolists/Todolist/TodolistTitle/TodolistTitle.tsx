import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { DeleteRounded } from "@mui/icons-material"
import { useAppDispatch } from "../../../../../../app/hooks"
import { todolistApi, useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import type { RequestStatus } from "../../../../../../app/appSlice"
import type { DomainTodolist } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const [deleteTodo] = useDeleteTodolistMutation()
  const [updateTodo] = useUpdateTodolistMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todo = state.find((tl) => tl.id === todolist.id)
        if (todo) {
          todo.entityStatus = status
        }
      }),
    )
  }

  const removeTodolist = () => {
    // dispatch(deleteTodolistTC({ id: todolist.id }))
    updateQueryData("loading")
    deleteTodo(todolist.id)
      .unwrap() // без него не попадем в кетч. но данные в then у нас будут не так глубоко упакованы
      .catch((err) => {
        updateQueryData("idle")
      })
  }

  const changeTodolistTitle = (title: string) => {
    // dispatch(updateTodolistTitleTC({ title, id: todolist.id }))
    updateTodo({ id: todolist.id, title })
  }

  return (
    <div>
      <Typography variant="h6" align="center">
        <EditableSpan
          title={todolist.title}
          changeTitle={changeTodolistTitle}
          disabled={todolist.entityStatus === "loading"}
        />
        <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === "loading"}>
          <DeleteRounded />
        </IconButton>
      </Typography>
    </div>
  )
}
