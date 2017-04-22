import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default function ListGroupItemLink({ to, children }) {
  return (
    <Route
      path={to}
      children={({ match: active }) => (
        <Link to={to} className={cx('list-group-item', { active })}>
          {children}
        </Link>
      )}
    />
  )
}

ListGroupItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
}
