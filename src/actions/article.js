import types from 'constants/ActionTypes'

export function fetchArticle(url) {
  return { type: types.FETCH_ARTICLE, url }
}

export function useCachedArticle(url) {
  return { type: types.USE_CACHED_ARTICLE, url }
}

export function requestArticle() {
  return { type: types.REQUEST_ARTICLE }
}

export function receiveArticle({ markdown, url }) {
  return {
    type: types.RECEIVE_ARTICLE,
    markdown,
    url,
    receivedAt: Date.now(),
  }
}

export function requestErrorArticle({ error, url }) {
  return { type: types.REQUEST_ERROR_ARTICLE, error, url }
}
