import { handleActions } from 'redux-actions'
import yaml from 'js-yaml'
import * as actions from 'actions/article'
import { article as initialState } from 'initialState'
import sliceYAMLConfig from '../../universal/sliceYAMLConfig'

// TODO: commonize
const getYamlConfig = markdown => yaml.load(sliceYAMLConfig(markdown))
const getTitle = markdown => getYamlConfig(markdown).title
const getAuthor = markdown => getYamlConfig(markdown).author
const getDate = markdown => getYamlConfig(markdown).date
const getTags = markdown => {
  const { tags } = getYamlConfig(markdown)
  if (!tags) return []
  return tags.split(/\s+/)
}

export default handleActions(
  {
    [actions.useCachedArticle]: (state, { payload }) => {
      const { markdown, next, prev } = state.cache[payload.url]
      return {
        ...state,
        title: getTitle(markdown),
        markdown,
        author: getAuthor(markdown),
        date: getDate(markdown),
        tags: getTags(markdown),
        url: payload.url,
        next,
        prev,
        isFetching: false,
        didInvalidate: false,
        error: null,
      }
    },

    [actions.requestArticle]: state => ({
      ...state,
      title: '',
      markdown: '',
      author: {},
      date: '',
      tags: [],
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
          title: getTitle(payload.markdown),
          markdown: payload.markdown,
          author: getAuthor(payload.markdown),
          date: getDate(payload.markdown),
          tags: getTags(payload.markdown),
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
          author: {},
          date: '',
          tags: [],
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
