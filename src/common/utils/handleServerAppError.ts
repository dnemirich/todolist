import { changeStatusAC, setAppErrorAC } from "../../app/app-reducer"
import type { AppDispatch } from "../../app/store"
import type { Response } from "common/types"

export const handleServerAppError = <T>(dispatch: AppDispatch, data: Response<T>) => {
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred"))
  dispatch(changeStatusAC("failed"))
}

// функции-дженерики

// Пример 1: Фильтрация чисел
// const filterArray = <T>(array: T[], predicate: (el: T) => boolean): T[] => {
//   return array.filter(predicate)
// }

// const numbers = [1, 2, 3, 4, 5, 6, 7]
// const isEven = (num: number) => num % 2 === 0
//
// const result = filterArray(numbers, isEven)
// console.log(result) // [2, 4]

// Пример 2: Фильтрация строк
// const words = ["hello", "world", "typescript"]
// const startsWithT = (word: string) => word.startsWith("t")
//
// const result2 = filterArray(words, startsWithT)
// console.log(result2) // ["typescript"]

// Пример 1: Преобразование чисел в строки

// const mapArray = <T, V>(array: T[], transformer: (el: T) => V): V[] => {
//   return array.map(transformer)
// }
//
// const numbers = [1, 2, 3, 4]
// const transformNumberToString = (num: number) => `Number: ${num}`
//
// const result = mapArray(numbers, transformNumberToString)
// console.log(result) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
//
// // Пример 2: Преобразование строк в их длины
// const words = ["hello", "world", "typescript"]
// const getLength = (word: string) => word.length
//
// const lengthResults = mapArray(words, getLength)
// console.log(lengthResults) // [5, 5, 10]
//
// // // Пример 3: Преобразование объектов в строки
// type Person = { name: string; age: number }
// const people: Person[] = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 30 },
// ]
// const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
//
// const descriptions = mapArray(people, toDescription)
// console.log(descriptions) // ["Alice is 25 years old", "Bob is 30 years old"]

// ДЗ
//Функция должна быть дженериковой и работать с массивами любого типа.
// Для проверки наличия элемента в массиве использовать метод includes.
// Тип массива и тип элемента должны быть связаны через дженерики.
// Функция должна быть чистой (не изменять оригинальный массив).

// Строки
const stringArray = ["apple", "banana", "cherry"]
const result1 = updateArray(stringArray, "banana") // ['apple', 'banana', 'cherry']
const result2 = updateArray(stringArray, "date") // ['apple', 'banana', 'cherry', 'date']

// Числа
const numberArray = [1, 2, 3]
const result3 = updateArray(numberArray, 2) // [1, 2, 3]
const result4 = updateArray(numberArray, 4) // [1, 2, 3, 4]

function updateArray<T>(arr: T[], el: T): T[] {
  return arr.includes(el) ? arr : [...arr, el]
}

console.log(result1)
console.log(result2)
console.log(result3)
console.log(result4)
