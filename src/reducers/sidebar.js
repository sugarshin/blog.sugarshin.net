import types from '../constants/ActionTypes';
import { sidebar as initialState } from '../constants/initialState';

export default function sidebar(state = initialState, action) {
  switch (action.type) {

  case types.TOGGLE_SIDEBAR_OPEN: return {
    ...state,
    open: action.open
  };

  case types.TOGGLE_SIDEBAR_DOCKED: return {
    ...state,
    docked: action.docked
  };

  default: return state;

  }
}
