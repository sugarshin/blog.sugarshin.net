import types from 'constants/ActionTypes';
import { searchResults as initialState } from 'constants/initialState';

export default function searchResults(state = initialState, action) {
  switch (action.type) {

  case types.REQUEST_SEARCH_ARTICLE: return {
    ...state,
    isFetching: true
  };

  case types.RECEIVE_SEARCH_ARTICLE: return {
    ...state,
    isFetching: false,
    items: action.items,
    incomplete: action.incomplete_results,
    totalCount: action.total_count
  };

  case types.REQUEST_ERROR_SEARCH_ARTICLE: return {
    ...state,
    isFetching: false,
    error: action.error
  };

  default: return state;

  }
}
