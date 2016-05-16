import types from '../constants/ActionTypes';
import { article as initialState } from '../constants/initialState';

export default function article(state = initialState, action) {
  switch (action.type) {

  case types.REQUEST_ARTICLE: return {
    ...state,
    markdown: '',
    url: '',
    isFetching: true,
    didInvalidate: false,
    error: null
  };

  case types.RECEIVE_ARTICLE: return {
    ...state,
    markdown: action.markdown,
    url: action.url,
    isFetching: false,
    didInvalidate: false,
    cache: { ...state.cache, [action.url]: action.markdown },
    error: null
  };

  case types.USE_CACHED_ARTICLE: return {
    ...state,
    markdown: state.cache[action.url],
    url: action.url,
    isFetching: false,
    didInvalidate: false,
    error: null
  }

  case types.REQUEST_ERROR_ARTICLE: return {
    ...state,
    markdown: '',
    url: action.url,
    isFetching: false,
    didInvalidate: true,
    error: action.error
  };

  default: return state;

  }
}
