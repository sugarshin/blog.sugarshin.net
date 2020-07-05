import React from 'react'
import { SyncIcon } from '@primer/octicons-react'
import styles from './index.styl'

export default function LoadingSpinner() {
  return (
    <div className={styles.loading}><SyncIcon className={styles.spinner} /></div>
  )
}
