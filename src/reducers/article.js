import { handleActions } from 'redux-actions'
import yaml from 'js-yaml'
import removeMarkdown from 'remove-markdown'
import * as actions from 'actions/article'
import { article as initialState } from './initialState'
import sliceYAMLConfig from '../../helpers/sliceYAMLConfig'
import removeYAMLConfig from '../../helpers/removeYAMLConfig'
import { protocol, domain } from '../../config/settings'

// TODO: commonize
const getYamlConfig = markdown => yaml.load(sliceYAMLConfig(markdown))
const getTitle = markdown => getYamlConfig(markdown).title
const getAuthor = markdown => getYamlConfig(markdown).author
const getDate = markdown => getYamlConfig(markdown).date
const getTags = markdown => {
  const { tags } = getYamlConfig(markdown)
  if (!tags) return []
  return tags.split(',').map(tag => tag.trim())
}
const getDescription = markdown => removeMarkdown(removeYAMLConfig(markdown)).replace(/\n/g, '').slice(0, 140)

// @params markdownPathname <year>-<month>-<day>_<title>.md
const getPathname = markdownPathname => markdownPathname.split('_')[1].replace('.md', '')

// @params date ref markdown frontmatter
// @params url <year>-<month>-<day>_<title>.md
const getPublicURL = (date, url) => {
  const [year, month, day] = date.split(' ')[0].split('-')
  return `${protocol}//${domain}/${year}/${month}/${day}/${getPathname(url)}/`
}
const getOgImageURL = markdown => getYamlConfig(markdown).ogp.og.image.src

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
      description: '',
      publicURL: '',
      ogImageURL: `${protocol}//${domain}/assets/images/common/open-graph.jpg`,
      next: null,
      prev: null,
      isFetching: true,
      didInvalidate: false,
      error: null,
    }),

    [actions.receiveArticle]: {
      next(state, { payload }) {
        const date = getDate(payload.markdown)
        return {
          ...state,
          title: getTitle(payload.markdown),
          markdown: payload.markdown,
          author: getAuthor(payload.markdown),
          date,
          tags: getTags(payload.markdown),
          url: payload.url,
          description: getDescription(payload.markdown),
          publicURL: getPublicURL(date, payload.url),
          ogImageURL: getOgImageURL(payload.markdown),
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
