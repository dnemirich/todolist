import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>


type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


const todolistid_1 = v1();
const todolistid_2 = v1();

// const initialState: TodolistType[] = [
//     { id: todolistid_1, title: "What to learn", filter: "all" },
//     { id: todolistid_2, title: "What to buy", filter: "all" }
// ];

const initialState:TodolistType[] = [];

export const todolistsReducer = (todolists: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            {
                const { todolistId } = action.payload;
                return todolists.filter(tl => tl.id !== todolistId)
            }
        case "ADD-TODOLIST":
            {
                const newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: "all" };
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
            return todolists
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const
}

export const addTodolistAC = (title: string) => {
    return { type: "ADD-TODOLIST", payload: { title, todolistId: v1() } } as const
}

export const changeTodolistTitleAC = (payload: { title: string, todolistId: string }) => {
    return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { newFilter: FilterValuesType, todolistId: string }) => {
    return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}