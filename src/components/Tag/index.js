import React from 'react'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TagIcon } from '@primer/octicons-react'
import PropTypes from 'prop-types'
import styles from './index.styl'

export default function Tag({ value }) {
  return (
    <Link to={`/tags/${value.replace(/\s/g, '_')}/`}>
      <Badge variant='primary' className={styles.label}>
        <TagIcon className={styles.icon} />
        <span className={styles.a}>{value}</span>
      </Badge>
    </Link>
  )
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
}
