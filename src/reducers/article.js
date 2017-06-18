import { handleActions } from 'redux-actions'
import * as actions from 'actions/article'
import { article as initialState } from 'initialState'

// TODO
const getArticleTitle = markdown => markdown.split('\n')[1].replace(/^title:/, '').trim()

export default handleActions(
  {
    [actions.useCachedArticle]: (state, { payload }) => ({
      ...state,
      title: getArticleTitle(state.cache[payload.url].markdown),
      markdown: state.cache[payload.url].markdown,
      url: payload.url,
      next: state.cache[payload.url].next,
      prev: state.cache[payload.url].prev,
      isFetching: false,
      didInvalidate: false,
      error: null,
    }),

    [actions.requestArticle]: state => ({
      ...state,
      title: '',
      markdown: '',
      url: '',
      next: null,
      prev: null,
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
          cache: {
            ...state.cache,
            [payload.url]: {
              markdown: payload.markdown,
              next: payload.next,
              prev: payload.prev,
            },
          },
          next: payload.next,
          prev: payload.prev,
          error: null,
        }
      },
      throw(state, { payload: error, meta }) {
        return {
          ...state,
          title: '',
          markdown: '',
          next: null,
          prev: null,
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
