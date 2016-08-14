import { takeLatest } from 'redux-saga'
import types from 'constants/ActionTypes';
import { fetchArticleList } from './articles';

export default function* rootSaga() {
  yield takeLatest(types.FETCH_ARTICLE_LIST, fetchArticleList);
}
