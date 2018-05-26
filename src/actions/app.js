import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import types from 'constants/ActionTypes'

/**
 * Change route path.
 *
 * @param {string} pathname
 * @param {Object} [options]
 * @param {string} [options.search]
 * @param {Object} [options.state]
 *
 * @returns {Function}
 */
export const goTo = (pathname, options = {}) => {
  return push({
    pathname,
    search: options.search,
    state: options.state,
  })
}

export const documentHeadStateChanged = createAction(types.DOCUMENT_HEAD_STATE_CHANGED)

export const locationChanged = createAction(
  types.LOCATION_CHANGED,
  null,
  (loc, headState) => ({ title: headState.title })
)
