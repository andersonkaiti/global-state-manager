type SetterFn<T> = (prevState: T) => Partial<T>

export function createStore<T>(initialState: T) {
  let state = initialState

  function setState(partialState: Partial<T> | SetterFn<T>) {
    const newValue =
      typeof partialState === 'function' ? partialState(state) : partialState

    state = {
      ...state,
      ...newValue,
    }
  }

  function getState() {
    return state
  }

  return {
    setState,
    getState,
  }
}

const store = createStore({
  userName: '',
  isActive: false,
  counter: 1,
})

console.log(store.getState())
store.setState({ userName: 'Anderson Kaiti' })

console.log(store.getState())
store.setState((prevState) => ({ isActive: !prevState.isActive }))

console.log(store.getState())
store.setState((prevState) => ({ counter: prevState.counter + 1 }))

console.log(store.getState())
store.setState((prevState) => ({ counter: prevState.counter + 1 }))

console.log(store.getState())
