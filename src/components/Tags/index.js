import React from 'react'
import PropTypes from 'prop-types'
import Tag from 'components/Tag'
import styles from './index.styl'

export default function Tags({ values }) {
  return <ul className={styles.root}>{values.map(v => <li key={v} className={styles.item}><Tag value={v} /></li>)}</ul>
}

Tags.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
}
