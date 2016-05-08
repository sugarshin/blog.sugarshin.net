import { combineReducers } from 'redux';
import article from './article';
import articles from './articles';

export default combineReducers({
  article,
  articles
});
