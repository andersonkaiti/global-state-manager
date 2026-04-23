type SetterFn<T> = (prevState: T) => Partial<T>

type SetStateFn<T> = (partialState: Partial<T> | SetterFn<T>) => void

export function createStore<T>(createState: (setState: SetStateFn<T>) => T) {
  let state = createState(setState)
  const listeners = new Set<() => void>()

  function setState(partialState: Partial<T> | SetterFn<T>) {
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

  return {
    setState,
    getState,
    subscribe,
    notifyListeners,
  }
}
