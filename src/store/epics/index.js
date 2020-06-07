import { of as of$ } from 'rxjs/observable/of'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { combineEpics } from 'redux-observable'
import Search from 'apis/Search'
import types from 'constants/ActionTypes'
import * as actions from 'actions'

export const searchArticle = action$ => action$
  .ofType(types.SEARCH_ARTICLE)
  .mergeMap(({ payload: query }) => Search.execute(query))
  .map(actions.receiveSearchArticle)
  .catch(e => of$(actions.receiveSearchArticle(e)))

export default combineEpics(
  searchArticle
)
