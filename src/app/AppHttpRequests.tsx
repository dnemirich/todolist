import Checkbox from "@mui/material/Checkbox"
import React, { ChangeEvent, useEffect, useState } from "react"
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm"
import { EditableSpan } from "../common/components/EditableSpan/EditableSpan"
import type { Todolist } from "../features/todolists/api/todolistsApi.types"
import { type BaseTask, type DomainTask } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { TaskStatus } from "../features/todolists/lib/enums"
import { tasksApi } from "../features/todolists/api/tasksApi"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prevState) => ({
            ...prevState,
            [tl.id]: res.data.items,
          }))
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodo = res.data.data.item
      setTodolists([newTodo, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists(todolists.filter((tl) => tl.id !== id)))
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi
      .updateTodolist({ id, title })
      .then(() => setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl))))
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks((prevState) => ({
        ...prevState,
        [todolistId]: prevState[todolistId] ? [newTask, ...prevState[todolistId]] : [newTask],
      }))
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi
      .removeTask({ taskId, todolistId })
      .then(() => setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) }))
  }

  const updateTaskHandler = (task: DomainTask, partialTask: Partial<BaseTask>) => {
    tasksApi.updateTask({ task, partialTask }).then((res) => {
      const newTask = res.data.data.item
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? newTask : t)),
      })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    updateTaskHandler(task, { status })
  }

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    updateTaskHandler(task, { title })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan title={tl.title} changeTitle={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan title={task.title} changeTitle={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
