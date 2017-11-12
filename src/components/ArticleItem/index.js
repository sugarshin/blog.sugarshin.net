import React from 'react'
import Icon from 'react-fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Tags from 'components/Tags'
import Octicon from 'components/utils/Octicon'
import styles from './index.styl'

export default function ArticleItem({ article }) {
  const to = `/${article.date.split(' ')[0].replace(/-/g, '/')}/${article.url}`
  return (
    <div className={styles.root}>
      <Link to={to}>
        <h2 className={styles.title}>{article.title}</h2>
      </Link>
        <p className={styles.preview}>
          {article.preview}
          <span className={styles.more}><Link to={to}>more <Icon name='angle-double-right' /></Link></span>
        </p>
        <div className={styles.tags}><Tags values={article.tags} /></div>
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
    </div>
  )
}

ArticleItem.propTypes = {
  article: PropTypes.shape({}), // TODO:
}
