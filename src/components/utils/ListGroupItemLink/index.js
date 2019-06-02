import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default function ListGroupItemLink({ to, children }) {
  return (
    <Route
      path={to}
      children={({ match: active }) => ( // eslint-disable-line react/no-children-prop
        <Link to={to} className={classnames('list-group-item', { active })}>
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
