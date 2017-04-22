import uniq from 'lodash/uniq'
import createReducer from 'utils/createReducer'
import types from 'constants/ActionTypes'
import { articles as initialState } from 'initialState'

export default createReducer(initialState, {
  [types.REQUEST_ARTICLES]: state => ({
    ...state,
    isFetching: true,
    isFetched: false,
    didInvalidate: false,
  }),

  [types.RECEIVE_ARTICLES]: (state, action) => {
    const { items } = action
    return {
      ...state,
      items,
      archives: _createArchives(items),
      tags: _createTags(items),
      isFetching: false,
      isFetched: true,
      didInvalidate: false,
    }
  },

  [types.REQUEST_ERROR_ARTICLES]: (state, action) => ({
    ...state,
    isFetching: false,
    isFetched: false,
    didInvalidate: true,
    error: action.error,
  }),
})

function _createArchives(items) {
  return items.reduce((archives, item) => {
    const date = item.date.split(' ')[0].replace(/\-\d\d$/, '') // TODO
    archives[date] = Array.isArray(archives[date]) ?
      [...archives[date], item] : [item]
    return archives
  }, {})
}

function _createTags(items) {
  return items.reduce((tags, item) => uniq([...tags, ...item.tags]), [])
    .sort((a, b) => a === b ? 0 : (a > b ? 1 : -1)) // 雑
}
