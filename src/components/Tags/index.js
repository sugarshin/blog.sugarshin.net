import React from 'react'
import Tag from 'components/Tag'
import styles from './index.styl'

export default function Tags({ values }) {
  return <ul className={styles.root}>{values.map(v => <li className={styles.item}><Tag value={v} /></li>)}</ul>
}
