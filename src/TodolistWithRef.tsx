import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {useRef} from "react";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const tasksList: JSX.Element = (props.tasks.length === 0)
        ? <div>Ваш список дел пуст</div>
        : <ul>
            {props.tasks.map((task) => {
                return (
                    <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        <Button title={"x"} onClickHandler={() => {
                            props.removeTask(task.id)
                        }}/>
                    </li>
                )
            })}
        </ul>

    const onClickAddTaskHandler = () => {
        if (inputRef.current) {
            props.addTask(inputRef.current.value);
            inputRef.current.value = "";
        }

    }

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input ref={inputRef}/>
                <Button title={"+"} onClickHandler={onClickAddTaskHandler}/>
            </div>

            {
                tasksList
            }
            <div>
                <Button
                    title={"All"}
                    onClickHandler={() => props.changeFilter("all")}/>
                <Button
                    title={"Active"}
                    onClickHandler={() => props.changeFilter("active")}/>
                <Button
                    title={"Completed"}
                    onClickHandler={() => props.changeFilter("completed")}/>
            </div>
        </div>
    );
};