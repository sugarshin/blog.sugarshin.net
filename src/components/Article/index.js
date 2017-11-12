import React from 'react'
import PropTypes from 'prop-types'
import Tags from 'components/Tags'
import ArticleMeta from 'components/ArticleMeta'
import ArticleBody from 'components/ArticleBody'
import ShareToolbar from 'components/ShareToolbar'
import ArticleNavigation from 'components/ArticleNavigation'
import Disqus from 'components/Disqus'
import styles from './index.styl'

export default function Article({ article, currentPathname, baseShareMessage }) {
  return (
    <div>
      <div className={styles.meta}>
        <Tags values={article.tags} />
        <ArticleMeta article={article} />
        <hr className={styles.hr} />
      </div>
      <ArticleBody markdown={article.markdown} />
      <ShareToolbar
        message={`${article.title} | ${baseShareMessage}`}
        url={`${window.location.origin}${currentPathname}`}
      />
      <ArticleNavigation next={article.next} prev={article.prev} />
      <Disqus
        shortname='logsugarshinnet'
        identifier={currentPathname}
        title={article.title}
      />
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.shape({
    markdown: PropTypes.string,
    title: PropTypes.string,
    next: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
    prev: PropTypes.shape({ title: PropTypes.string, url: PropTypes.string }),
  }),
  currentPathname: PropTypes.string.isRequired,
  baseShareMessage: PropTypes.string.isRequired,
}
