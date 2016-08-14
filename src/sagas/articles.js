import { call, put, select } from 'redux-saga/effects'
import Articles from 'apis/Articles';
import * as actions from 'actions';
import decodeArticleContent from 'utils/decodeArticleContent';
import hasObjectKey from 'utils/hasObjectKey';

export function* fetchArticleList() {
  const { articles } = yield select();
  if (!shouldFetchArticles(articles)) {
    return;
  }
  yield put(actions.requestArticles());
  try {
    const articles = yield call([Articles, Articles.getList]);
    yield put(actions.receiveArticles(articles));
  } catch (error) {
    yield put(actions.requestErrorArticles(error));
  }
}

export function* fetchArticle({ url }) {
  const { article } = yield select();
  if (shouldUseCachedArticle(article, url)) {
    yield put(actions.useCachedArticle(url));
  } else {
    if (!shouldFetchArticle(article)) {
      return;
    }
    yield put(actions.requestArticle());
    try {
      const { content } = yield call([Articles, Articles.getArticle], url);
      yield put(actions.receiveArticle({ markdown: decodeArticleContent(content), url }))
    } catch (error) {
      yield put(actions.requestErrorArticle(error));
    }
  }
}

export function* searchArticle({ query }) {
  try {
    const data = yield call([Articles, Articles.search], query);
    yield put(actions.receiveSearchArticle(data))
  } catch (error) {
    yield put(actions.requestErrorSearchArticle(error));
  }
}

function shouldFetchArticles(state) {
  return !(state.isFetching || state.isFetched);
}

function shouldUseCachedArticle(state, url) {
  return hasObjectKey(state.cache, url);
}

function shouldFetchArticle(state) {
  return !state.isFetching;
}
