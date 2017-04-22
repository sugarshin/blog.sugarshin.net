import React from 'react'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

export default function LoadingSpinner() {
  return (
    <div className={styles.loading}><Octicon className={styles.spinner} spin name='sync' /></div>
  )
}
