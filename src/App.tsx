import React, { useState } from 'react';
import './App.css';
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { Container, Grid2 } from '@mui/material';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}


function App() {
    // BLL:

    // const todolistTitle = "What to learn";
    // const todolistTitle_2 = "What to buy";
    //
    // const tasks_1: Array<TaskType> = [
    //     {
    //         id: v1(),
    //         title: "HTML & CSS",
    //         isDone: true,
    //     },
    //     {
    //         id: v1(),
    //         title: "JS",
    //         isDone: true,
    //     },
    //     {
    //         id: v1(),
    //         title: "React",
    //         isDone: false,
    //     },
    //     {
    //         id: v1(),
    //         title: "Redux",
    //         isDone: false,
    //     }
    // ]
    // const tasks_2: Array<TaskType> = [
    //     {
    //         id: v1(),
    //         title: "Milk",
    //         isDone: false,
    //     },
    //     {
    //         id: v1(),
    //         title: "Bread",
    //         isDone: false,
    //     },
    //     {
    //         id: v1(),
    //         title: "Butter",
    //         isDone: false,
    //     },
    //     {
    //         id: v1(),
    //         title: "Chips",
    //         isDone: false,
    //     },
    // ]

    const todolistid_1 = v1();
    const todolistid_2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistid_1, title: "What to learn", filter: "all" },
        { id: todolistid_2, title: "What to buy", filter: "all" }
    ]);


    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistid_1]: [
                { id: v1(), title: "HTML & CSS", isDone: true, },
                { id: v1(), title: "JS", isDone: true, },
                { id: v1(), title: "React", isDone: false, },
                { id: v1(), title: "Redux", isDone: false, },],
            [todolistid_2]: [
                { id: v1(), title: "Milk", isDone: false, },
                { id: v1(), title: "Bread", isDone: false, },
                { id: v1(), title: "Butter", isDone: false, },
                { id: v1(), title: "Chips", isDone: false, },]
        }
    )

    const removeTask = (taskId: string, todolistId: string) => {

        // // 1. make a new version of a state
        // const newState: Array<TaskType> = tasks.filter(t => t.id !== taskId); //new state #234234
        // // 2. give to SetState a new version of a state.
        // setTasks(newState);


        // new version:
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) });
    }


    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }

        // setTasks([newTask, ...tasks])

        // new version
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        })
    }

    const changeStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        // let task = tasks.find((t) => t.id === taskId);
        // if (task) {
        //     task.isDone = taskStatus;
        // }
        // setTasks([...tasks]);

        // другой вариант:
        // const newState = tasks.map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t))
        // setTasks(newState);


        // new version
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone: taskStatus } : t))
        })
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t))
        })
    }


    // GUI:


    const changeTodolistFilter = (newFilter: FilterValuesType, todolistId: string) => {
        // setFilter(newFilter)

        // new version
        setTodolists(
            todolists.map(tl => tl.id === todolistId ? { ...tl, filter: newFilter } : tl)
        )
    }


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))

        delete tasks[todolistId] // можно и без стейта сделать, потому что нам уже не надо отображать тудулист
    }


    const addTodolist = (title: string) => {
        const todolistID = v1();
        const newTodolist: TodolistType = { id: todolistID, title, filter: "all" };

        setTodolists([...todolists, newTodolist]);
        setTasks({ ...tasks, [todolistID]: [] })
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(
            todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl)
        )
    }

    return (

        <Container>

            <Grid2 container spacing={2}>

                <div>
                    <h3>Add todolist</h3>
                    <AddItemForm addItem={addTodolist} />
                </div>

                {
                    todolists.map(tl => {

                        let filteredTasks: Array<TaskType> = tasks[tl.id];

                        if (tl.filter === "active") {
                            filteredTasks = filteredTasks.filter(t => !t.isDone)
                        }
                        if (tl.filter === "completed") {
                            filteredTasks = filteredTasks.filter(t => t.isDone)
                        }


                        return (
                            <Todolist
                                todolistId={tl.id}
                                key={tl.id}
                                title={tl.title}
                                tasks={filteredTasks}
                                removeTask={removeTask}
                                changeTodolistFilter={changeTodolistFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                                changeTaskTitle={changeTaskTitle}
                            />
                        )
                    })
                }

            </Grid2>
        </Container>

    );
}

export default App;
