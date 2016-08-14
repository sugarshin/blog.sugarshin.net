import types from 'constants/ActionTypes';

export function searchArticle(query) {
  return { type: types.SEARCH_ARTICLE, query };
}

export function requestSearchArticle() {
  return { type: types.REQUEST_SEARCH_ARTICLE };
}

export function receiveSearchArticle(res) {
  return {
    type: types.RECEIVE_SEARCH_ARTICLE,
    items: res.items,
    incomplete: res.incomplete_results,
    totalCount: res.total_count
  };
}

export function requestErrorSearchArticle(error) {
  return { type: types.REQUEST_ERROR_SEARCH_ARTICLE, error };
}
