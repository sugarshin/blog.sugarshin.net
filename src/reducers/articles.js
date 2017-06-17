import uniq from 'lodash/uniq'
import { handleActions } from 'redux-actions'
import * as actions from 'actions/articles'
import { articles as initialState } from 'initialState'

// TODO:
const createArchives = items => {
  return items.reduce((archives, item) => {
    const date = item.date.split(' ')[0].replace(/-\d\d$/, '') // TODO
    archives[date] = Array.isArray(archives[date]) ?
      [...archives[date], item] : [item]
    return archives
  }, {})
}
// TODO:
const createTags = items => {
  return items.reduce((tags, item) => uniq([...tags, ...item.tags]), [])
    .sort((a, b) => a === b ? 0 : (a > b ? 1 : -1))
}

export default handleActions(
  {
    [actions.requestArticleList]: state => ({
      ...state,
      isFetching: true,
      isFetched: false,
      didInvalidate: false,
      error: null,
    }),

    [actions.receiveArticleList]: {
      next(state, { payload: { items } }) {
        return {
          ...state,
          items,
          archives: createArchives(items),
          tags: createTags(items),
          isFetching: false,
          isFetched: true,
          didInvalidate: false,
          error: null,
        }
      },
      throw(state, { payload: error }) {
        return {
          ...state,
          isFetching: false,
          isFetched: false,
          didInvalidate: true,
          error,
        }
      },
    },
  },
  initialState
)
