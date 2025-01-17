import { _tasksApi } from "../api/tasksApi"
import type { AppThunk } from "../../../app/store"
import type { BaseTask, DomainTask } from "../api/tasksApi.types"
import { ResultCode } from "../lib/enums"
import { changeStatus } from "../../../app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolistsSlice"

export type TasksStateType = {
  [todolistId: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    updateTask: create.reducer<{ task: DomainTask; partialTask: Partial<BaseTask> }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      const index = tasks.findIndex((t) => t.id === action.payload.task.id)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.partialTask }
      }
    }),
    clearData: create.reducer((state, action) => {
      return {}
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
  },
})

export const { setTasks, removeTask, updateTask, addTask, clearData } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
// THUNK

export const fetchTasksTC =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(changeStatus({ status: "loading" }))
    _tasksApi
      .getTasks(id)
      .then((res) => {
        dispatch(changeStatus({ status: "succeeded" }))
        dispatch(setTasks({ todolistId: id, tasks: res.data.items }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const removeTaskTC =
  (args: { todolistId: string; taskId: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatus({ status: "loading" }))
    _tasksApi
      .removeTask(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeStatus({ status: "succeeded" }))
          dispatch(removeTask(args))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const addTaskTC =
  (args: { title: string; todolistId: string }): AppThunk =>
  (dispatch) => {
    dispatch(changeStatus({ status: "loading" }))
    _tasksApi
      .createTask(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(changeStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const updateTaskTC =
  (args: { task: DomainTask; partialTask: Partial<BaseTask> }): AppThunk =>
  (dispatch) => {
    // const { task, partialTask } = args
    dispatch(changeStatus({ status: "loading" }))
    _tasksApi
      .updateTask(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(changeStatus({ status: "succeeded" }))
          dispatch(updateTask(args))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
