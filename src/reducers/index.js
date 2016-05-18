import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import article from './article';
import articles from './articles';
import sidebar from './sidebar';

export default combineReducers({
  article,
  articles,
  sidebar,
  routing: routerReducer
});
