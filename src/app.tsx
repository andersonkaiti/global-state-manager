import './store/create-store'

import { AppBar } from './components/app-bar'
import { TodosList } from './components/todos-list'
import { GlobalProvider } from './contexts/global-context'
import { useRenderCounter } from './hooks/use-render-counter'

export function App() {
  useRenderCounter('App')

  return (
    <GlobalProvider>
      <AppBar />
      <TodosList />
    </GlobalProvider>
  )
}
