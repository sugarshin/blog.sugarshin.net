import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import article from './article'
import articles from './articles'
import sidebar from './sidebar'
import searchResults from './searchResults'

export default combineReducers({
  article,
  articles,
  sidebar,
  searchResults,
  routing,
})
