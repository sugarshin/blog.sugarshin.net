import { call, put, select } from 'redux-saga/effects'
import * as Actions from 'actions';
import Articles from 'apis/Articles';

export function* fetchArticleList() {
  const { articles } = yield select();
  if (articles.isFetching || articles.isFetched) {
    return;
  }
  yield put(Actions.requestArticles());
  try {
    const articles = yield call(Articles.getList);
    yield put(Actions.receiveArticles(articles));
  } catch (error) {
    yield put(Actions.requestErrorArticles(error));
  }
}
