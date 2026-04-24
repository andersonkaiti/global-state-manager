import './store/create-store'

import { AppBar } from './components/app-bar'
import { TodosList } from './components/todos-list'
import { useRenderCounter } from './hooks/use-render-counter'

export function App() {
  useRenderCounter('App')

  return (
    <>
      <AppBar />
      <TodosList />
    </>
  )
}
