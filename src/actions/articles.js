import types from 'constants/ActionTypes';

export function fetchArticleList() {
  return { type: types.FETCH_ARTICLE_LIST };
}

export function requestArticles() {
  return { type: types.REQUEST_ARTICLES };
}

export function receiveArticles(items) {
  return {
    type: types.RECEIVE_ARTICLES,
    items,
    receivedAt: Date.now()
  };
}

export function requestErrorArticles(error) {
  return { type: types.REQUEST_ERROR_ARTICLES, error };
}
