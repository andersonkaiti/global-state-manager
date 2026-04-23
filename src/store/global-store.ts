import type { ITodo } from '../entities/itodo'
import type { IUser } from '../entities/iuser'
import { createStore } from './create-store'

interface IGlobalStore {
  user: IUser | null
  todos: ITodo[]
  //   login(): void
  //   logout(): void
  //   addTodo(title: string, author?: string): void
  //   toggleTodoDone(todoId: number): void
  //   removeTodo(todoId: number): void
}

export const globalStore = createStore<IGlobalStore>({
  user: null,
  todos: [],
})
