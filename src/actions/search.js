import { createAction } from 'redux-actions'
import types from 'constants/ActionTypes'

export const searchArticle = createAction(types.SEARCH_ARTICLE)
export const receiveSearchArticle = createAction(
  types.RECEIVE_SEARCH_ARTICLE,
  res => ({
    items: res.items,
    incomplete: res.incomplete_results,
    totalCount: res.total_count,
  })
)
