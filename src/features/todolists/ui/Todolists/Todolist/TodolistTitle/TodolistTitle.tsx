import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { DeleteRounded } from "@mui/icons-material"
import { deleteTodolistTC, type DomainTodolist, updateTodolistTitleTC } from "../../../../model/todolistsSlice"
import { useAppDispatch } from "../../../../../../app/hooks"
import { useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const [deleteTodo] = useDeleteTodolistMutation()
  const [updateTodo] = useUpdateTodolistMutation()
  const removeTodolist = () => {
    // dispatch(deleteTodolistTC({ id: todolist.id }))
    deleteTodo(todolist.id)
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
