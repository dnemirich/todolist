import { addTodolist, removeTodolist } from "../todolistsSlice"
import { addTask, removeTask, tasksReducer, type TasksStateType, updateTask } from "../tasksSlice"
import { TaskPriority, TaskStatus } from "../../lib/enums"
import { v1 } from "uuid"

let startState: TasksStateType = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 1,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 2,
        startDate: "",
        priority: TaskPriority.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 1,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriority.Low,
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTask({ todolistId: "todolistId2", taskId: "2" }))

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 1,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        description: "",
        order: 2,
        startDate: "",
        priority: TaskPriority.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriority.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        startDate: "",
        priority: TaskPriority.Low,
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const newTask = {
    id: "1",
    title: "juice",
    status: TaskStatus.New,
    todoListId: "todolistId2",
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    startDate: "",
    priority: TaskPriority.Low,
  }
  const endState = tasksReducer(startState, addTask({ task: newTask }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
  const task = startState["todolistId1"][1]
  const endState = tasksReducer(startState, updateTask({ task, partialTask: { status: TaskStatus.Completed } }))

  expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatus.New)
})

test("title of specified task should be changed", () => {
  const task = startState["todolistId2"][2]

  const endState = tasksReducer(startState, updateTask({ task, partialTask: { title: "coffee" } }))

  expect(endState["todolistId1"][2].title).toBe("React")
  expect(endState["todolistId2"][2].title).toBe("coffee")
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolist({ todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})

test("new array should be added when new todolist is added", () => {
  const newTodo = { id: v1(), title: "new todolist", filter: "all", addedDate: "", order: 2 }
  const endState = tasksReducer(startState, addTodolist({ todolist: newTodo }))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
