import React from 'react';
import Octicon from 'react-octicon';
import styles from './index.styl';

export default function LoadingSpinner() {
  return (
    <div className={styles.loading}><Octicon className={styles.spinner} spin name='sync' /></div>
  );
}
