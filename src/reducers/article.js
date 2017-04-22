import createReducer from 'utils/createReducer'
import types from 'constants/ActionTypes'
import { article as initialState } from 'initialState'

export default createReducer(initialState, {
  [types.REQUEST_ARTICLE]: state => ({
    ...state,
    title: '',
    markdown: '',
    url: '',
    isFetching: true,
    didInvalidate: false,
    error: null,
  }),

  [types.RECEIVE_ARTICLE]: (state, action) => ({
    ...state,
    title: getArticleTitle(action.markdown),
    markdown: action.markdown,
    url: action.url,
    isFetching: false,
    didInvalidate: false,
    cache: { ...state.cache, [action.url]: action.markdown },
    error: null,
  }),

  [types.USE_CACHED_ARTICLE]: (state, action) => ({
    ...state,
    title: getArticleTitle(state.cache[action.url]),
    markdown: state.cache[action.url],
    url: action.url,
    isFetching: false,
    didInvalidate: false,
    error: null,
  }),

  [types.REQUEST_ERROR_ARTICLE]: (state, action) => ({
    ...state,
    title: '',
    markdown: '',
    url: action.url,
    isFetching: false,
    didInvalidate: true,
    error: action.error,
  }),
})

// TODO
function getArticleTitle(markdown) {
  return markdown.split('\n')[1].replace(/^title:/, '').trim()
}
