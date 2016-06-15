import React from 'react';
import Octicon from 'react-octicon';
import styles from './index.styl';

export default function NoResults() {
  return (
    <div className={styles.wrapper}>
      <Octicon name='circle-slash' className={styles.icon} />
      <p>No results...</p>
    </div>
  );
}
