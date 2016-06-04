import React from 'react';
import styles from './index.styl'

export default function PageTitle({ title }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
