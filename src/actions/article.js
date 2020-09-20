import { createAction } from 'redux-actions'
import has from 'lodash/has'
import types from 'constants/ActionTypes'
import { createNextAndPrev } from './helpers'

const shouldUseCachedArticle = (state, url) => has(state.article.cache, url)

export const fetchArticle = fileName => async (dispatch, getState, { api }) => {
  if (shouldUseCachedArticle(getState(), fileName)) {
    dispatch(useCachedArticle(fileName))
    return
  }
  dispatch(requestArticle())
  const markdown = await api.Articles.get(fileName).catch(e => e)
  if (markdown instanceof Error) {
    const err = markdown
    dispatch(receiveArticle(err))
    return
  }
  const state = getState()
  const articles = state.articles.items.length > 0 ? state.articles.items : await api.Articles.getList().catch(e => e)
  if (articles instanceof Error) {
    const err = articles
    dispatch(receiveArticle(err))
    return
  }
  const [next, prev] = createNextAndPrev(articles, fileName)
  dispatch(receiveArticle({ markdown, url: fileName, next, prev }, fileName))
}
export const useCachedArticle = createAction(types.USE_CACHED_ARTICLE, url => ({ url }))
export const requestArticle = createAction(types.REQUEST_ARTICLE)
export const receiveArticle = createAction(
  types.RECEIVE_ARTICLE,
  ({ markdown, url, next, prev }) => ({
    markdown,
    url,
    next,
    prev,
  }),
  (payload, url) => ({ url })
)
