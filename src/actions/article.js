import { createAction } from 'redux-actions'
import types from 'constants/ActionTypes'

export const fetchArticle = createAction(types.FETCH_ARTICLE)
export const useCachedArticle = createAction(types.USE_CACHED_ARTICLE, url => ({ url }))
export const requestArticle = createAction(types.REQUEST_ARTICLE)
export const receiveArticle = createAction(
  types.RECEIVE_ARTICLE,
  ({ markdown, url }) => ({
    markdown,
    url,
    receivedAt: Date.now(),
  }),
  (payload, url) => ({ url })
)
