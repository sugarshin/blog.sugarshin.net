import types from 'constants/ActionTypes';

export function searchArticle(query) {
  return { type: types.SEARCH_ARTICLE, query };
}

export function receiveSearchArticle(res) {
  return {
    type: types.RECEIVE_SEARCH_ARTICLE,
    items: res.items,
    incomplete: res.incomplete_results,
    totalCount: res.total_count
  };
}

export function receiveSearchArticleError(error) {
  return { type: types.RECEIVE_SEARCH_ARTICLE_ERROR, error };
}
