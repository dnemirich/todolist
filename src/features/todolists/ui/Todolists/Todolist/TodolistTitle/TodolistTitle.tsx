import { IconButton, Typography } from "@mui/material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { DeleteRounded } from "@mui/icons-material"
import {
  changeTodolistTitleAC,
  deleteTodolistTC,
  type DomainTodolist,
  removeTodolistAC,
  updateTodolistTitleTC,
} from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../app/hooks"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(deleteTodolistTC({ id: todolist.id }))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ title, id: todolist.id }))
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
