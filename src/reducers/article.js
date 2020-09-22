import { handleActions } from 'redux-actions'
import * as actions from 'actions/article'
import { article as initialState } from './initialState'
import toOneLine from '../../markdown/toOneLine'
import parseYamlFrontmatter from '../../markdown/parseYamlFrontmatter'
import { protocol, domain } from '../../config/settings'

const getTitle = markdown => parseYamlFrontmatter(markdown).title
const getAuthor = markdown => parseYamlFrontmatter(markdown).author
const getDate = markdown => parseYamlFrontmatter(markdown).date
const getTags = markdown => {
  const { tags } = parseYamlFrontmatter(markdown)
  if (!tags) return []
  return tags.split(',').map(tag => tag.trim())
}
const getDescription = markdown => toOneLine(markdown)

// @params markdownPathname <year>-<month>-<day>_<title>.md
const getPathname = markdownPathname => markdownPathname.split('_')[1].replace('.md', '')

// @params date ref markdown frontmatter
// @params url <year>-<month>-<day>_<title>.md
const getPublicURL = (date, url) => {
  const [year, month, day] = date.split(' ')[0].split('-')
  return `${protocol}//${domain}/${year}/${month}/${day}/${getPathname(url)}/`
}
const getOgImageURL = markdown => parseYamlFrontmatter(markdown).ogp.og.image.src

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
