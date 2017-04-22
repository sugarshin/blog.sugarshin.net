import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { protocol, domain } from '../../../config/settings'
import styles from './index.styl'

export default function SearchResults({ items }) {
  return (
    <div className={styles.root}>
      <ul>
        {items.map(a => {
          const [date, name] = a.name.split('_')
          const to = `/${date.replace(/-/g, '/')}/${name.replace(/\.md$/, '')}/`
          return (
            <li key={to}>
              <Link to={to}>{`${protocol}//${domain}${to}`}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

SearchResults.propTypes = {
  items:PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.stirng })),
}
