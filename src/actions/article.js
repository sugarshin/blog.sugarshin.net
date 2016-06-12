import Articles from 'apis/Articles';
import types from 'constants/ActionTypes';

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
    if (shouldUseCachedArticle(state, url)) {
      return dispatch(useCachedArticle(url));
    } else {
      if (shouldFetchArticle(state)) {
        return dispatch(fetchArticle(url));
      }
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
    return Articles.get(url)
      .then(res => res.json())
      .then(({ content }) => dispatch(receiveArticle({ markdown: _atob(content), url })))
      .catch(error =>  dispatch(requestErrorArticle({ error, url })));
  };
}

function shouldFetchArticle(state) {
  if (state.isFetching) {
    return false;
  }
  return true;
}

function _atob(value) {
  return decodeURIComponent(escape(atob(value)));
}
