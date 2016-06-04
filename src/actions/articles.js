import types from '../constants/ActionTypes';

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
    return fetch('/_articles/index.json')
      .then(res => res.json())
      .then(articles => {
        setTimeout(() => dispatch(receiveArticles(articles)), 4000);
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
