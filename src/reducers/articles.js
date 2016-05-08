import types from '../constants/ActionTypes';
import { articles as initialState } from '../constants/initialState';

export default function articles(state = initialState, action) {
  switch (action.type) {

  case types.REQUEST_ARTICLES:
    return Object.assign({}, state, { isFetching: true, didInvalidate: false });

  case types.RECEIVE_ARTICLES:
    console.log('action', action);
    return Object.assign({}, state, {
      items: action.items,
      isFetching: false,
      didInvalidate: false
    });

  case types.REQUEST_ERROR_ARTICLES:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true,
      error: action.error
    });

  default:
    return state;

  }
}
