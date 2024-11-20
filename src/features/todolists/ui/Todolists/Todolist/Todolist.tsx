import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {Paper} from "@mui/material";
import {addTaskAC} from "../../../model/tasks-reducer";

import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

import {Tasks} from "./Tasks/Tasks";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import type {TodolistType} from "../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../app/hooks";


type Props = {
    todolist: TodolistType
}

export const Todolist = ({todolist}: Props) => {
        const dispatch = useAppDispatch();

        const addTask = (title: string) => {
            dispatch(addTaskAC({title, todolistId: todolist.id}));
        }

    return (

        <Paper sx={{ p: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask} />
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </Paper>

    );
}
    ;