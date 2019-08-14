import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import article from './article'
import articles from './articles'
import sidebar from './sidebar'
import searchResults from './searchResults'

export function createRootReducer({ history }) {
  return combineReducers({
    article,
    articles,
    sidebar,
    searchResults,
    router: connectRouter(history),
  })
}
