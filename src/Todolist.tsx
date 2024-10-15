import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, useState, KeyboardEvent} from "react";


type TodolistPropsType = {
    todolistId: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);


    const tasksList: JSX.Element = (props.tasks.length === 0)
        ? <div>Ваш список дел пуст</div>
        : <ul>
            {props.tasks.map((task) => {
                const removeTaskHandler = () => {
                    props.removeTask(task.id, props.todolistId);
                }

                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(task.id, e.currentTarget.checked, props.todolistId);
                }

                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <span>{task.title}</span>
                        <Button title={"x"} onClickHandler={removeTaskHandler}/>
                    </li>
                )
            })}
</ul>

const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
        props.addTask(taskTitle.trim(), props.todolistId);
        setTaskTitle("");

    } else {
        setError("Title is required")
    }
}

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
}

const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
        addTaskHandler();
    }
}

const changeFilterTasksHandler = (filter: FilterValuesType) => {
    props.changeTodolistFilter(filter, props.todolistId)
}

const isTitleLengthValid = taskTitle.length < 15

return (
    <div className="todolist">
        <h3>
            {props.title}
            <Button title={"x"} onClickHandler={() => props.removeTodolist(props.todolistId)}/>
        </h3>
        <div>
            <input
                value={taskTitle}
                onChange={onChangeHandler}
                placeholder={"Title is required"}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""}
            />
            <Button
                title={"+"}
                onClickHandler={addTaskHandler}
                isDisabled={!isTitleLengthValid}
            />
            {error && <div className={"error-message"}>Title is required</div>}
        </div>

        {
            tasksList
        }
        <div>
            <Button
                className={props.filter === "all" ? "active-filter" : ""}
                title={"All"}
                onClickHandler={() => changeFilterTasksHandler("all")}/>
            <Button
                className={props.filter === "active" ? "active-filter" : ""}
                title={"Active"}
                onClickHandler={() => changeFilterTasksHandler("active")}/>
            <Button
                className={props.filter === "completed" ? "active-filter" : ""}
                title={"Completed"}
                onClickHandler={() => changeFilterTasksHandler("completed")}/>
        </div>
    </div>
);
}
;