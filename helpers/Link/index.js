const React = require('react')
const { Link: ReactRouterLink } = require('react-router-dom')
const PropTypes = require('prop-types')
const isAbsoluteUrl = require('is-absolute-url')

const Link = props => {
  if (isAbsoluteUrl(props.href)) {
    return React.createElement('a', props)
  }
  return React.createElement(ReactRouterLink, Object.assign({}, props, { to: props.href }))
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
}

module.exports = Link
