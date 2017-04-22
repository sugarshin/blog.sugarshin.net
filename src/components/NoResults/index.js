import React from 'react'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

export default function NoResults() {
  return (
    <div className={styles.wrapper}>
      <Octicon name='circle-slash' className={styles.icon} />
      <p>No results...</p>
    </div>
  )
}
