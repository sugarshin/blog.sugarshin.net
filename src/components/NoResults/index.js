import React from 'react'
import { CircleSlashIcon } from '@primer/octicons-react'
import styles from './index.styl'

export default function NoResults() {
  return (
    <div className={styles.wrapper}>
      <CircleSlashIcon className={styles.icon} />
      <p>No results...</p>
    </div>
  )
}
