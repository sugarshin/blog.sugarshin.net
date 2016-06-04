import React from 'react';
import Icon from 'react-fa';
import { Link } from 'react-router';
import styles from './index.styl';

export default function ArticleItem({ article }) {
  const to = `/${article.date.split(' ')[0].replace(/-/g, '/')}/${article.url}`;
  return (
    <div className={styles.root}>
      <Link to={to}>
        <h2 className={styles.title}>{article.title}</h2>
      </Link>
        <p className={styles.preview}>
          {article.preview}
          <span className={styles.more}><Link to={to}>more <Icon name='angle-double-right ' /></Link></span>
        </p>
        <div className={styles.time}><time>{article.date}</time></div>
    </div>
  );
}
