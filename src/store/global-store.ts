import { createStore } from './create-store'

interface ITodo {
  id: number
  title: string
  author: string
  done: boolean
}

interface IGlobalStore {
  user: {
    name: string
    email: string
  } | null
  todos: ITodo[]
  login(): void
  logout(): void
  addTodo(title: string, author?: string): void
  toggleTodoDone(todoId: number): void
  removeTodo(todoId: number): void
}

export const useGlobalStore = createStore<IGlobalStore>(
  (setState, getState) => ({
    user: null,
    todos: [],
    login: () =>
      setState({
        user: {
          email: 'anderkaiti@gmail.com',
          name: 'Anderson Kaiti',
        },
      }),
    logout: () => setState({ user: null }),
    addTodo: (title: string) => {
      setState((prevState) => ({
        todos: prevState.todos.concat({
          id: Date.now(),
          title,
          author: getState().user?.name ?? 'Convidado',
          done: false,
        }),
      }))
    },
    toggleTodoDone: (todoId: number) => {
      setState((prevState) => ({
        todos: prevState.todos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                done: !todo.done,
              }
            : todo,
        ),
      }))
    },
    removeTodo: (todoId: number) => {
      setState((prevState) => ({
        todos: prevState.todos.filter((todo) => todo.id !== todoId),
      }))
    },
  }),
)
