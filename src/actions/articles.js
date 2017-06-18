import { createAction } from 'redux-actions'
import types from 'constants/ActionTypes'

export const fetchArticleList = createAction(types.FETCH_ARTICLE_LIST)
export const requestArticleList = createAction(types.REQUEST_ARTICLE_LIST)
export const receiveArticleList = createAction(
  types.RECEIVE_ARTICLE_LIST,
  items => ({
    items,
  })
)
