import { push } from 'react-router-redux'

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
