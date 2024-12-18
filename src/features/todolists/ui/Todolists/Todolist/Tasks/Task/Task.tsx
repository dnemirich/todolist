import { getListItemSx } from "./Task.styles"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "common/components"
import { Clear } from "@mui/icons-material"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import type { DomainTodolist } from "../../../../../model/todolists-reducer"
import { ChangeEvent } from "react"
import { useAppDispatch } from "../../../../../../../app/hooks"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskTC({ todolistId: todolist.id, taskId: task.id }))
  }

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    // dispatch(updateTaskStatusTC({ taskId: task.id, status, todolistId: todolist.id }))
    dispatch(updateTaskTC({ task, partialTask: { status } }))
  }

  const changeTaskTitle = (title: string) => {
    // dispatch(updateTaskTitleTC({ taskId: task.id, title, todolistId: todolist.id }))
    dispatch(updateTaskTC({ task, partialTask: { title } }))
  }

  return (
    <ListItem
      sx={getListItemSx(task.status === TaskStatus.Completed)}
      // sx={{ display: "flex", justifyContent: "space-between", opacity: task.isDone ? '0.5' : '1' }}
      disablePadding
    >
      <Box>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeStatus} size="small" />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
      </Box>
      <IconButton onClick={removeTask}>
        <Clear fontSize="small" />
      </IconButton>
    </ListItem>
  )
}
