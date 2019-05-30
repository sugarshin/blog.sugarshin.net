import React from 'react'
import PropTypes from 'prop-types'
import ArticleItem from 'components/ArticleItem'
import styles from './index.styl'

export default function Articles({ articles, id }) {
  return (
    <div className={styles.wrapper} id={id}>
      {articles.length > 0 ? articles.map(article => {
        return <ArticleItem key={`${article.date.split(' ')[0]}_${article.url}`} article={article} />
      }) : <p>No results...</p>}
    </div>
  )
}

Articles.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({ date: PropTypes.string, url: PropTypes.string })),
  id: PropTypes.string,
}
