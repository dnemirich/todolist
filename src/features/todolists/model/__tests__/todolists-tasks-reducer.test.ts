import { tasksReducer, type TasksStateType } from "../tasks-reducer"
import { addTodolistAC, todolistsReducer, type DomainTodolist } from "../todolists-reducer"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  const newTodo: DomainTodolist = { id: v1(), title: "new todolist", order: 0, filter: "all", addedDate: "" }
  const action = addTodolistAC(newTodo)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
