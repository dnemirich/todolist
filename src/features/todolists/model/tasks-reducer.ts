import type { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { tasksApi } from "../api/tasksApi"
import type { AppThunk } from "../../../app/store"
import type { BaseTask, DomainTask } from "../api/tasksApi.types"
import { TaskStatus } from "../lib/enums"

export type TasksStateType = {
  [todolistId: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (tasks: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      const stateCopy = { ...tasks }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "REMOVE_TASK": {
      const { taskId, todolistId } = action.payload
      return { ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) }
    }
    case "ADD_TASK": {
      const newTask = action.payload.task
      return {
        ...tasks,
        [newTask.todoListId]: [newTask, ...tasks[newTask.todoListId]],
      }
    }
    case "UPDATE_TASK": {
      const { task, partialTask } = action.payload
      return {
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...partialTask } : t)),
      }
    }
    // case "CHANGE_TASK_STATUS": {
    //   const { taskId, status, todolistId } = action.payload
    //   return {
    //     ...tasks,
    //     [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, status } : t)),
    //   }
    // }
    // case "CHANGE_TASK_TITLE": {
    //   const { taskId, title, todolistId } = action.payload
    //   return {
    //     ...tasks,
    //     [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, title } : t)),
    //   }
    // }
    case "REMOVE-TODOLIST":
      const newState = { ...tasks }
      delete newState[action.payload.todolistId]
      return newState
    case "ADD-TODOLIST":
      return { ...tasks, [action.payload.todolist.id]: [] }
    default:
      return tasks
  }
}

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD_TASK", payload } as const
}

// export const changeTaskStatusAC = (payload: { taskId: string; status: TaskStatus; todolistId: string }) => {
//   return { type: "CHANGE_TASK_STATUS", payload } as const
// }
//
// export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) => {
//   return { type: "CHANGE_TASK_TITLE", payload } as const
// }

export const updateTaskAC = (payload: { task: DomainTask; partialTask: Partial<BaseTask> }) => {
  return { type: "UPDATE_TASK", payload } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTasksActionType
  | UpdateTaskActionType

// THUNK

export const fetchTasksTC =
  (id: string): AppThunk =>
  (dispatch) => {
    tasksApi.getTasks(id).then((res) => {
      dispatch(setTasksAC({ todolistId: id, tasks: res.data.items }))
    })
  }

export const removeTaskTC =
  (args: { todolistId: string; taskId: string }): AppThunk =>
  (dispatch) => {
    tasksApi.removeTask(args).then((res) => {
      dispatch(removeTaskAC(args))
    })
  }

export const addTaskTC =
  (args: { title: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    tasksApi.createTask(args).then((res) => {
      dispatch(addTaskAC({ task: res.data.data.item }))
    })
  }

// export const updateTaskStatusTC =
//   (args: { taskId: string; status: TaskStatus; todolistId: string }): AppThunk =>
//   (dispatch, getState) => {
//     const { taskId, status, todolistId } = args
//     const allTasks = getState().tasks
//     const task = allTasks[todolistId].find((t) => t.id === taskId)
//     if (task) {
//       tasksApi.updateTask({ task, partialTask: { status } }).then((res) => {
//         dispatch(changeTaskStatusAC(args))
//       })
//     }
//   }
//
// export const updateTaskTitleTC =
//   (args: { taskId: string; title: string; todolistId: string }): AppThunk =>
//   (dispatch, getState) => {
//     const { taskId, title, todolistId } = args
//     const allTasks = getState().tasks
//     const task = allTasks[todolistId].find((t) => t.id === taskId)
//     if (task) {
//       tasksApi.updateTask({ task, partialTask: { title } }).then((res) => {
//         dispatch(changeTaskTitleAC(args))
//       })
//     }
//   }

export const updateTaskTC =
  (args: { task: DomainTask; partialTask: Partial<BaseTask> }): AppThunk =>
  (dispatch) => {
    // const { task, partialTask } = args
    tasksApi.updateTask(args).then((res) => {
      dispatch(updateTaskAC(args))
    })
  }
