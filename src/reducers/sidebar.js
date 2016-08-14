import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';
import { sidebar as initialState } from 'initialState';

export default createReducer(initialState, {
  [types.TOGGLE_SIDEBAR_OPEN]: (state, action) => ({
    ...state,
    open: action.open
  }),

  [types.TOGGLE_SIDEBAR_DOCKED]: (state, action) => ({
    ...state,
    docked: action.docked
  })
});
