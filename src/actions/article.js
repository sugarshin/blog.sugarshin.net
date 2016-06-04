import types from '../constants/ActionTypes';

function hasObjectKey(object, key) {
  return Object.keys(object).some(k => k === key);
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
