import types from 'constants/ActionTypes';
import { author, name } from '../../package.json';

export function searchArticle(q) {
  return dispatch => {
    dispatch(requestSearchArticle());
    const query = `${q} "public: true"`;
    // Thanks https://github.com/ngs/sources.ngs.io/blob/master/source/search.slim
    return fetch(`https://api.github.com/search/code?q=${
      encodeURIComponent(query)
    }+in:file+in:path+extension:md+repo:${author}/${name}+path:/articles/&per_page=100`)
      .then(res => res.json())
      .then(data => dispatch(receiveSearchArticle(data)))
      .catch(err => dispatch(requestErrorSearchArticle(err)));
  };
}

function requestSearchArticle() {
  return { type: types.REQUEST_SEARCH_ARTICLE };
}

function receiveSearchArticle(res) {
  return {
    type: types.RECEIVE_SEARCH_ARTICLE,
    items: res.items,
    incomplete: res.incomplete_results,
    totalCount: res.total_count
  };
}

function requestErrorSearchArticle(error) {
  return {
    type: types.REQUEST_ERROR_SEARCH_ARTICLE,
    error
  };
}
