import types from '../constants/ActionTypes';
import { article as initialState } from '../constants/initialState';

export default function article(state = initialState, action) {
  switch (action.type) {

  case types.REQUEST_ARTICLE:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
      error: null
    });

  case types.RECEIVE_ARTICLE:
    return Object.assign({}, state, {
      markdown: action.markdown,
      isFetching: false,
      didInvalidate: false,
      error: null
    });

  case types.REQUEST_ERROR_ARTICLE:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true,
      error: action.error
    });

  default:
    return state;

  }
}
