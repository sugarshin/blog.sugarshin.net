import { handleActions } from 'redux-actions'
import * as actions from 'actions/article'
import { article as initialState } from 'initialState'

// TODO
const getArticleTitle = markdown => markdown.split('\n')[1].replace(/^title:/, '').trim()

export default handleActions(
  {
    [actions.useCachedArticle]: (state, { payload }) => ({
      ...state,
      title: getArticleTitle(state.cache[payload.url]),
      markdown: state.cache[payload.url],
      url: payload.url,
      isFetching: false,
      didInvalidate: false,
      error: null,
    }),

    [actions.requestArticle]: state => ({
      ...state,
      title: '',
      markdown: '',
      url: '',
      isFetching: true,
      didInvalidate: false,
      error: null,
    }),

    [actions.receiveArticle]: {
      next(state, { payload }) {
        return {
          ...state,
          title: getArticleTitle(payload.markdown),
          markdown: payload.markdown,
          url: payload.url,
          isFetching: false,
          didInvalidate: false,
          cache: { ...state.cache, [payload.url]: payload.markdown },
          error: null,
        }
      },
      throw(state, { payload: error, meta }) {
        return {
          ...state,
          title: '',
          markdown: '',
          url: meta.url,
          isFetching: false,
          didInvalidate: true,
          error,
        }
      },
    },
  },
  initialState
)
