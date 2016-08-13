import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';
import { searchResults as initialState } from 'constants/initialState';

export default createReducer(initialState, {
  [types.REQUEST_SEARCH_ARTICLE]: state => ({
    ...state,
    isFetching: true
  }),

  [types.RECEIVE_SEARCH_ARTICLE]: (state, action) => ({
    ...state,
    isFetching: false,
    items: action.items,
    incomplete: action.incomplete_results,
    totalCount: action.total_count
  }),

  [types.REQUEST_ERROR_SEARCH_ARTICLE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  })
});
