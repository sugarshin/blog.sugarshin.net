import { of as of$ } from 'rxjs/observable/of'
import { concat as concat$ } from 'rxjs/observable/concat'
import { fromPromise as fromPromise$ } from 'rxjs/observable/fromPromise'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { combineEpics } from 'redux-observable'
import has from 'lodash/has'
import Articles from 'apis/Articles'
import Search from 'apis/Search'
import types from 'constants/ActionTypes'
import * as actions from 'actions'
import createNextAndPrev from './helpers/createNextAndPrev'

export const fetchArticleList = action$ => action$
  .ofType(types.FETCH_ARTICLE_LIST)
  .mergeMap(() => concat$(
    of$(actions.requestArticleList()),
    fromPromise$(Articles.getList())
    .map(actions.receiveArticleList)
    .catch(e =>
      of$(actions.receiveArticleList(e))
    )
  ))
  .catch(e => of$(actions.receiveArticleList(e)))

export const fetchArticle = (action$, store) => action$
  .ofType(types.FETCH_ARTICLE)
  .mergeMap(({ payload: url }) => {
    if (shouldUseCachedArticle(store.getState(), url)) {
      return Promise.resolve().then(() => actions.useCachedArticle(url))
    }
    return concat$(
      of$(actions.requestArticle()),
      fromPromise$(
        Promise.all([getArticleList(store.getState()), Articles.get(url)])
      )
      .map(([items, markdown]) => {
        const [next, prev] = createNextAndPrev(items, url)
        return actions.receiveArticle({ markdown, url, next, prev }, url)
      })
      .catch(error =>
        of$(actions.receiveArticle(error, url))
      )
    )
  })
  .catch(error => of$(actions.receiveArticle(error)))

const shouldUseCachedArticle = (state, url) => has(state.article.cache, url)
const getArticleList = state => {
  return state.articles.items.length > 0 ? Promise.resolve(state.articles.items) : Articles.getList()
}

export const searchArticle = action$ => action$
  .ofType(types.SEARCH_ARTICLE)
  .mergeMap(({ payload: query }) => Search.execute(query))
  .map(actions.receiveSearchArticle)
  .catch(e => of$(actions.receiveSearchArticle(e)))

export default combineEpics(
  fetchArticleList,
  fetchArticle,
  searchArticle
)
