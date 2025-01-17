import { getListItemSx } from "./Task.styles"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "common/components"
import { Clear } from "@mui/icons-material"
import { ChangeEvent } from "react"
import { useAppDispatch } from "../../../../../../../app/hooks"
import type { BaseTask, DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import type { DomainTodolist } from "../../../../../lib/types/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const [remove] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTask = () => {
    remove({ todolistId: todolist.id, taskId: task.id })
  }

  const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: BaseTask = { ...task, status }
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitle = (title: string) => {
    const model: BaseTask = { ...task, title }
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  return (
    <ListItem
      sx={getListItemSx(task.status === TaskStatus.Completed)}
      // sx={{ display: "flex", justifyContent: "space-between", opacity: task.isDone ? '0.5' : '1' }}
      disablePadding
    >
      <Box>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          disabled={todolist.entityStatus === "loading"}
          onChange={changeStatus}
          size="small"
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} disabled={todolist.entityStatus === "loading"} />
      </Box>
      <IconButton onClick={removeTask} disabled={todolist.entityStatus === "loading"}>
        <Clear fontSize="small" />
      </IconButton>
    </ListItem>
  )
}
