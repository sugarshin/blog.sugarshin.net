import React from 'react'
import PropTypes from 'prop-types'
import { PencilIcon, ClockIcon } from '@primer/octicons-react'
import styles from './index.styl'

const ArticleMeta = ({ article }) => {
  return (
    <div className={styles.meta}>
      <span className={styles.metaContent}>
        <PencilIcon className={styles.metaIcon} />
        <a href={article.author.url} target='_blank' rel='noopener noreferrer'>{article.author.name}</a>
      </span>
      <span className={styles.metaContent}>
        <ClockIcon className={styles.metaIcon} />
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
