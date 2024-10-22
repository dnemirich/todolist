import { FilterValuesType, TaskType } from "./App";
// import { Button } from "./Button";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Box, Button, Checkbox, IconButton, List, ListItem, Paper, Typography } from "@mui/material";
import { Clear, DeleteRounded } from "@mui/icons-material";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";
import { FilterButton } from "./FilterButton";


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
    changeTodolistTitle: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    // const [taskTitle, setTaskTitle] = useState<string>("");
    // const [error, setError] = useState<string | null>(null);


    const tasksList: JSX.Element = (props.tasks.length === 0)
        ? <div>Ваш список дел пуст</div>
        : <List>
            {props.tasks.map((task) => {
                const removeTaskHandler = () => {
                    props.removeTask(task.id, props.todolistId);
                }

                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(task.id, e.currentTarget.checked, props.todolistId);
                }

                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.todolistId)
                }

                return (
                    <ListItem
                        key={task.id}
                        sx={getListItemSx(task.isDone)}
                        // sx={{ display: "flex", justifyContent: "space-between", opacity: task.isDone ? '0.5' : '1' }}
                        disablePadding >
                        <Box>
                            <Checkbox checked={task.isDone} onChange={onChangeHandler} size="small" />
                            {/* <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} /> */}
                            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
                        </Box>
                        <IconButton onClick={removeTaskHandler}><Clear fontSize="small" /></IconButton>
                        {/* <Button title={"x"} onClickHandler={removeTaskHandler} /> */}
                    </ListItem>
                )
            })}
        </List>


    const addTaskHandler = (taskTitle: string) => {
        props.addTask(taskTitle, props.todolistId);
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTaskTitle(e.currentTarget.value)
    // }
    //
    // const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === "Enter") {
    //         addTaskHandler();
    //     }
    // }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeTodolistFilter(filter, props.todolistId)
    }

    // const isTitleLengthValid = taskTitle.length < 15
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId);
    }


    return (

        <Paper sx={{ p: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <div>
                <Typography variant="h6" align="center">
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                    <IconButton onClick={() => props.removeTodolist(props.todolistId)}><DeleteRounded /></IconButton>
                </Typography>
                {/* <Button title={"x"} onClickHandler={() => props.removeTodolist(props.todolistId)} /> */}
            </div>
            <AddItemForm addItem={addTaskHandler} />
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={taskTitle}*/}
            {/*        onChange={onChangeHandler}*/}
            {/*        placeholder={"Title is required"}*/}
            {/*        onKeyDown={onKeyDownHandler}*/}
            {/*        className={error ? "error" : ""}*/}
            {/*    />*/}
            {/*    <Button*/}
            {/*        title={"+"}*/}
            {/*        onClickHandler={addTaskHandler}*/}
            {/*        isDisabled={!isTitleLengthValid}*/}
            {/*    />*/}
            {/*    {error && <div className={"error-message"}>Title is required</div>}*/}
            {/*</div>*/}

            {
                tasksList
            }
            <Box
                sx={filterButtonsContainerSx}
            // sx={{ display: "flex", justifyContent: "space-between", gap: "5px" }}

            >
                <FilterButton title="all" filter={props.filter} activeFilterValue="all" onClickHandler={() => changeFilterTasksHandler("all")} />
                <FilterButton title="active" filter={props.filter} activeFilterValue="active" onClickHandler={() => changeFilterTasksHandler("active")} />
                <FilterButton title="completed" filter={props.filter} activeFilterValue="completed" onClickHandler={() => changeFilterTasksHandler("completed")} />

                {/* <Button color={props.filter === "all" ? "secondary" : "primary"} size="small" variant="contained" onClick={() => changeFilterTasksHandler("all")}>All</Button> */}
                {/* <Button color={props.filter === "active" ? "secondary" : "primary"} size="small" variant="contained" onClick={() => changeFilterTasksHandler("active")}>Active</Button> */}
                {/* <Button color={props.filter === "completed" ? "secondary" : "primary"} size="small" variant="contained" onClick={() => changeFilterTasksHandler("completed")}>Completed</Button> */}

                {/* <Button
                    className={props.filter === "all" ? "active-filter" : ""}
                    title={"All"}
                    onClickHandler={() => changeFilterTasksHandler("all")} />
                <Button
                    className={props.filter === "active" ? "active-filter" : ""}
                    title={"Active"}
                    onClickHandler={() => changeFilterTasksHandler("active")} />
                <Button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    title={"Completed"}
                    onClickHandler={() => changeFilterTasksHandler("completed")} /> */}
            </Box>
        </Paper>

    );
}
    ;