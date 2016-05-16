import types from '../constants/ActionTypes';

function hasObjectKey(object, key) {
  return Object.keys(object).some(k => k === key);
}

export function selectDate(date) {
  return {
    type: types.SELECT_DATE,
    date
  };
}

export function selectCategory(category) {
  return {
    type: types.SELECT_CATEGORY,
    category
  };
}

export function fetchArticlesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArticles(getState())) {
      return dispatch(fetchArticles());
    }
  };
}

function requestArticles() {
  return { type: types.REQUEST_ARTICLES };
}

function receiveArticles(items) {
  return {
    type: types.RECEIVE_ARTICLES,
    items,
    receivedAt: Date.now()
  };
}

function requestErrorArticles(error) {
  return {
    type: types.REQUEST_ERROR_ARTICLES,
    error
  };
}

function fetchArticles() {
  return dispatch => {
    dispatch(requestArticles());
    return fetch('/index.json')
      .then(res => res.json())
      .then(articles => {
        console.log('articles', articles);
        dispatch(receiveArticles(articles));
      })
      .catch(err =>  dispatch(requestErrorArticles(err)));
  };
}

function shouldFetchArticles({ articles }) {
  if (articles.isFetching || articles.isFetched) {
    return false;
  }
  return true;
}

function useCachedArticle(url) {
  return {
    type: types.USE_CACHED_ARTICLE,
    url
  };
}

function shouldUseCachedArticle(state, url) {
  if (hasObjectKey(state.cache, url)) {
    return true;
  }
  return false;
}

export function fetchArticleIfNeeded(url) {
  return (dispatch, getState) => {
    const state = getState().article;
    if (!shouldUseCachedArticle(state, url)) {
      if (shouldFetchArticle(state)) {
        return dispatch(fetchArticle(url));
      }
    } else {
      return dispatch(useCachedArticle(url));
    }
  };
}

function requestArticle() {
  return { type: types.REQUEST_ARTICLE };
}

function receiveArticle({ markdown, url }) {
  return {
    type: types.RECEIVE_ARTICLE,
    markdown,
    url,
    receivedAt: Date.now()
  };
}

function requestErrorArticle({ error, url }) {
  return {
    type: types.REQUEST_ERROR_ARTICLE,
    url,
    error
  };
}

function fetchArticle(url) {
  return dispatch => {
    dispatch(requestArticle());
    return fetch(url)
      .then(res => res.text())
      .then(markdown => dispatch(receiveArticle({ markdown, url })))
      .catch(error =>  dispatch(requestErrorArticle({ error, url })));
  };
}

function shouldFetchArticle(state) {
  if (state.isFetching) {
    return false;
  }
  return true;
}
