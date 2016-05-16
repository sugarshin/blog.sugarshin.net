import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import article from './article';
import articles from './articles';

export default combineReducers({
  article,
  articles,
  routing: routerReducer
});
