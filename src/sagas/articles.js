import has from 'lodash/has';
import { call, put, select } from 'redux-saga/effects'
import Articles from 'apis/Articles';
import Search from 'apis/Search';
import * as actions from 'actions';
import decodeArticleContent from 'utils/decodeArticleContent';

export function* fetchArticleList() {
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
    yield put(actions.requestArticle());
    try {
      const { content } = yield call([Articles, Articles.get], url);
      yield put(actions.receiveArticle({ markdown: decodeArticleContent(content), url }))
    } catch (error) {
      yield put(actions.requestErrorArticle(error));
    }
  }
}

export function* searchArticle({ query }) {
  try {
    const data = yield call([Search, Search.execute], query);
    yield put(actions.receiveSearchArticle(data))
  } catch (error) {
    yield put(actions.receiveSearchArticleError(error));
  }
}

function shouldUseCachedArticle(state, url) {
  return has(state.cache, url);
}
