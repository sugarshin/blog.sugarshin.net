import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import isAbsoluteUrl from 'is-absolute-url'

export function Link(props) {
  if (isAbsoluteUrl(props.href)) {
    return <a {...props} />
  }
  return <ReactRouterLink {...props} to={props.href} />
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
}
