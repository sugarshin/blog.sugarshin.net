import types from '../constants/ActionTypes';

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
  return {
    type: types.REQUEST_ARTICLES
  };
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
  if (articles.isFetching) {
    return false;
  }
  return true;
}

export function fetchArticleIfNeeded(url) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState())) {
      return dispatch(fetchArticle(url));
    }
  };
}

function requestArticle() {
  return {
    type: types.REQUEST_ARTICLE
  };
}

function receiveArticle(markdown) {
  return {
    type: types.RECEIVE_ARTICLE,
    markdown,
    receivedAt: Date.now()
  };
}

function requestErrorArticle(error) {
  return {
    type: types.REQUEST_ERROR_ARTICLE,
    error
  };
}

function fetchArticle(url) {
  return dispatch => {
    dispatch(requestArticle());
    return fetch(url)
      .then(res => res.text())
      .then(markdown => {
        console.log(markdown);
        dispatch(receiveArticle(markdown));
      })
      .catch(err =>  dispatch(requestErrorArticle(err)));
  };
}

function shouldFetchArticle({ article }) {
  if (article.isFetching) {
    return false;
  }
  return true;
}
