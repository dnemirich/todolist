import {getListItemSx} from "./Task.styles";
import {Box, Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import {Clear} from "@mui/icons-material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../../../../model/tasks-reducer";
import type {TodolistType} from "../../../../../model/todolists-reducer";
import {ChangeEvent} from "react";
import {useAppDispatch} from "../../../../../../../app/hooks";


type Props = {
    task: TaskType
    todolist: TodolistType;
}


export const Task = ({task, todolist}: Props) => {
    const dispatch = useAppDispatch();

    const removeTask = () => {
        dispatch(removeTaskAC({todolistId: todolist.id, taskId: task.id}));
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({taskId: task.id, isDone: e.currentTarget.checked, todolistId:todolist.id}));
    }

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}));
    }


    return (
        <ListItem
            sx={getListItemSx(task.isDone)}
            // sx={{ display: "flex", justifyContent: "space-between", opacity: task.isDone ? '0.5' : '1' }}
            disablePadding>
            <Box>
                <Checkbox checked={task.isDone} onChange={changeStatus} size="small"/>
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            </Box>
            <IconButton onClick={removeTask}><Clear fontSize="small"/></IconButton>
        </ListItem>
    );
};
