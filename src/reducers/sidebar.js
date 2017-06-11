import createReducer from 'utils/createReducer'
import types from 'constants/ActionTypes'
import { sidebar as initialState } from 'initialState'

export default createReducer(initialState, {
  [types.OPEN_SIDEBAR]: state => ({
    ...state,
    open: true,
  }),

  [types.CLOSE_SIDEBAR]: state => ({
    ...state,
    open: false,
  }),

  [types.TOGGLE_SIDEBAR]: state => ({
    ...state,
    open: !state.open,
  }),

  [types.TOGGLE_SIDEBAR_DOCKED]: (state, action) => ({
    ...state,
    docked: action.docked,
  }),
})
