import React from 'react';
import ArticleItem from 'components/ArticleItem';
import styles from './index.styl';

export default function Articles(props) {
  return (
    <div className={styles.wrapper}>
      {props.articles.length > 0 ? props.articles.map(article => {
        return <ArticleItem key={`${article.date.split(' ')[0]}_${article.url}`} article={article} />;
      }) : <p>No results...</p>}
    </div>
  );
}
