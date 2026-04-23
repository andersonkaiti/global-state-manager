import { useSyncExternalStore } from 'react'

type SetterFn<T> = (prevState: T) => Partial<T>

type SetStateFn<T> = (partialState: Partial<T> | SetterFn<T>) => void

export function createStore<TState>(
  createState: (setState: SetStateFn<TState>) => TState,
) {
  let state = createState(setState)
  const listeners = new Set<() => void>()

  function setState(partialState: Partial<TState> | SetterFn<TState>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState

    state = {
      ...state,
      ...newValue,
    }

    notifyListeners()
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  function notifyListeners() {
    listeners.forEach((listener) => listener())
  }

  function getState() {
    return state
  }

  function useStore<TValue>(
    selector: (currentState: TState) => TValue,
  ): TValue {
    /**
     * Sincroniza o componente com uma store externa (qualquer objeto)
     * Parametros do useSyncExternalStore:
     * 1. Subscribe: função que retorna uma função que cancela a inscrição
     * 2. getSnapshot: função que retorna o estado atual
     * 3. getServerSnapshot: função que retorna o estado atual no servidor (opcional)
     */

    return useSyncExternalStore(subscribe, () => selector(state))

    // const [value, setValue] = useState(() => selector(state))

    // useEffect(() => {
    //   const unsubscribe = subscribe(() => {
    //     const newValue = selector(state)

    //     if (value !== newValue) {
    //       setValue(newValue)
    //     }
    //   })
    //   return () => unsubscribe()
    // }, [selector, value])

    // return value
  }

  return {
    setState,
    getState,
    subscribe,
    notifyListeners,
    useStore,
  }
}
