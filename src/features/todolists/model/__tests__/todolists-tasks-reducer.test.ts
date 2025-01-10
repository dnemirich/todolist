import { tasksReducer, type TasksStateType } from "../tasksSlice"
import { addTodolist, todolistsReducer, type DomainTodolist } from "../todolistsSlice"
import { v1 } from "uuid"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  const newTodo: DomainTodolist = {
    id: v1(),
    title: "new todolist",
    order: 0,
    filter: "all",
    addedDate: "",
    entityStatus: "idle",
  }
  const action = addTodolist({ todolist: newTodo })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
