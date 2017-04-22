export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => handlers.hasOwnProperty(action.type) ?
    handlers[action.type](state, action) : state
}
