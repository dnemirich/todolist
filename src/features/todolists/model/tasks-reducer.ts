
import {v1} from "uuid";
import type {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

// const initialState: TasksStateType = {
//     todolistId1: [
//         { id: '1', title: 'CSS', isDone: false },
//         { id: '2', title: 'JS', isDone: true },
//         { id: '3', title: 'React', isDone: false },
//     ],
//     todolistId2: [
//         { id: '1', title: 'bread', isDone: false },
//         { id: '2', title: 'milk', isDone: true },
//         { id: '3', title: 'tea', isDone: false },
//     ],
// }

const initialState: TasksStateType = {}

export const tasksReducer = (tasks: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            {
                const { taskId, todolistId } = action.payload;
                return { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) };
            }
        case "ADD_TASK":
            {
                const { title, todolistId } = action.payload;
                return {
                    ...tasks,
                    [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]]
                }
            }
        case "CHANGE_TASK_STATUS":
            {
                const { taskId, isDone, todolistId } = action.payload;
                return {
                    ...tasks,
                    [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone } : t))
                }
            }
        case "CHANGE_TASK_TITLE":
            {
                const { taskId, title, todolistId } = action.payload;
                return {
                    ...tasks,
                    [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t))
                }
            }
        case "REMOVE-TODOLIST":
            const newState = { ...tasks }
            delete newState[action.payload.todolistId]
            return newState
        case "ADD-TODOLIST":
            return { ...tasks, [action.payload.todolistId]: [] }
        default:
            return tasks
    }
}

export const removeTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return { type: "REMOVE_TASK", payload } as const
}

export const addTaskAC = (payload: { title: string, todolistId: string}) => {
    return { type: "ADD_TASK", payload } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    return { type: "CHANGE_TASK_STATUS", payload } as const
}

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => {
    return { type: "CHANGE_TASK_TITLE", payload } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType