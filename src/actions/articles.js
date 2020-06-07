import { createAction } from 'redux-actions'
import types from 'constants/ActionTypes'

export const fetchArticleList = () => async (dispatch, _, { api }) => {
  dispatch(requestArticleList())
  try {
    const articles = await api.Articles.getList()
    dispatch(receiveArticleList(articles))
  } catch (error) {
    dispatch(receiveArticleList(error))
  }
}
export const requestArticleList = createAction(types.REQUEST_ARTICLE_LIST)
export const receiveArticleList = createAction(
  types.RECEIVE_ARTICLE_LIST,
  items => ({
    items,
  })
)
