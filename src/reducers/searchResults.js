import { handleActions } from 'redux-actions'
import * as actions from 'actions/search'
import { searchResults as initialState } from './initialState'

export default handleActions(
  {
    [actions.searchArticle]: state => ({
      ...state,
      isFetching: true,
      error: null,
    }),

    [actions.receiveSearchArticle]: {
      next(state, { payload }) {
        return {
          ...state,
          isFetching: false,
          items: payload.items,
          incomplete: payload.incomplete,
          totalCount: payload.totalCount,
          error: null,
        }
      },
      throw(state, { payload: error }) {
        return {
          ...state,
          isFetching: false,
          error,
        }
      },
    },
  },
  initialState
)
