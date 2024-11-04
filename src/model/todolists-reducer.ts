import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: { todolistId: string }
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: { title: string, todolistId: string }
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: { title: string, todolistId: string }
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: { newFilter: FilterValuesType, todolistId: string }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (todolists: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            {
                const { todolistId } = action.payload;
                return todolists.filter(tl => tl.id !== todolistId)
            }
        case "ADD-TODOLIST":
            {
                const { title, todolistId } = action.payload;
                const newTodolist: TodolistType = { id: todolistId, title, filter: "all" };
                return [...todolists, newTodolist];
            }
        case "CHANGE-TODOLIST-TITLE":
            {
                const { title, todolistId } = action.payload;
                return todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl);
            }
        case "CHANGE-TODOLIST-FILTER":
            {
                const { newFilter, todolistId } = action.payload;
                return todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newFilter } : tl)
            }
        default:
            throw new Error("Unknow action type");
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: "REMOVE-TODOLIST", payload: { todolistId } }
}

export const AddTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", payload: { title, todolistId } }
}

export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", payload: { title, todolistId } }
}

export const ChangeTodolistFilterAC = (newFilter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return { type: "CHANGE-TODOLIST-FILTER", payload: { newFilter, todolistId } }
}