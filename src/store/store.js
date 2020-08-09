function Store(rootReducer, initialState) {
  let state = rootReducer(initialState, {type: '__init__'})
  let subscribers = []

  return {
    dispatch(action, params = null) {
      state = rootReducer(state, action, params)
      subscribers.forEach(sub => sub())
    },

    subscribe(callback) {
      subscribers.push(callback)
    },

    getState() {
      return state
    }
  }
}

export default Store