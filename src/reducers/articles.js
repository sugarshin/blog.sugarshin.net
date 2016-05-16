import types from '../constants/ActionTypes';
import { articles as initialState } from '../constants/initialState';

export default function articles(state = initialState, action) {
  switch (action.type) {

  case types.REQUEST_ARTICLES: return {
    ...state,
    isFetching: true,
    isFetched: false,
    didInvalidate: false
  };

  case types.RECEIVE_ARTICLES: return {
    ...state,
    items: action.items,
    isFetching: false,
    isFetched: true,
    didInvalidate: false
  };

  case types.REQUEST_ERROR_ARTICLES: return {
    ...state,
    isFetching: false,
    isFetched: false,
    didInvalidate: true,
    error: action.error
  };

  default: return state;

  }
}
