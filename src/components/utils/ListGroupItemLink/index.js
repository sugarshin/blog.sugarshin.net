import React from 'react'
import { Route, Link } from 'react-router-dom'
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
