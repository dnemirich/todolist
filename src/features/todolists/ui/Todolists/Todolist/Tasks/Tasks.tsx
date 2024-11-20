import {List} from "@mui/material";
import type {TaskType} from "../../../../model/tasks-reducer";
import {TodolistType} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../app/hooks";
import {selectTasks} from "../../../../model/tasks-selectors";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}:Props) => {

    const tasks = useAppSelector(selectTasks);
    let filteredTasks: Array<TaskType> = tasks[todolist.id];

    if (todolist.filter === "active") {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (todolist.filter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }


    return (
     (filteredTasks.length === 0)
        ? <div>Ваш список дел пуст</div>
        : <List>
            {filteredTasks.map((task) => {
                return (
                    <Task key={task.id} task={task} todolist={todolist}/>
                )
            })}
        </List>
    );
};
