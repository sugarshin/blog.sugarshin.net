import React from 'react'
import { Label } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

export default function Tag({ value }) {
  return (
    <Link to={`/tags/${value.replace(/\s/g, '_')}/`}>
      <Label bsStyle='primary' className={styles.label}>
        <Octicon name='tag' className={styles.icon} />
        <span className={styles.a}>{value}</span>
      </Label>
    </Link>
  )
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
}
