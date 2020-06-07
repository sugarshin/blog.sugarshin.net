import { createAction } from 'redux-actions'
import types from 'constants/ActionTypes'

export const searchArticle = query => async (dispatch, _, { api }) => {
  dispatch(requestSearchArticle())
  const res = await api.Search.execute(query).catch(e => e)
  dispatch(receiveSearchArticle(res))
}
export const requestSearchArticle = createAction(types.REQUEST_SEARCH_ARTICLE)
export const receiveSearchArticle = createAction(
  types.RECEIVE_SEARCH_ARTICLE,
  res => ({
    items: res.items,
    incomplete: res.incomplete_results,
    totalCount: res.total_count,
  })
)
