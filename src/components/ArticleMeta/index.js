import React from 'react'
import PropTypes from 'prop-types'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

const ArticleMeta = ({ article }) => {
  return (
    <div className={styles.meta}>
      <span className={styles.metaContent}>
        <Octicon name='pencil' className={styles.metaIcon} />
        <a href={article.author.url} target='_blank'>{article.author.name}</a>
      </span>
      <span className={styles.metaContent}>
        <Octicon name='clock' className={styles.metaIcon} />
        <time>{article.date}</time>
      </span>
    </div>
  )
}

ArticleMeta.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
}

export default ArticleMeta
