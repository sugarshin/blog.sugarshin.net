import React from 'react'
import PropTypes from 'prop-types'
import ArticleBody from 'components/ArticleBody'
import ShareToolbar from 'components/ShareToolbar'
import Disqus from 'components/Disqus'

export default function Article({ article, currentPathname, baseShareMessage }) {
  return (
    <div>
      <ArticleBody markdown={article.markdown} />
      <ShareToolbar
        message={`${article.title} | ${baseShareMessage}`}
        url={`${window.location.origin}${currentPathname}`}
      />
      <Disqus
        shortname='logsugarshinnet'
        identifier={currentPathname}
        title={article.title}
      />
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.shape({ markdown: PropTypes.string, title: PropTypes.string }),
  currentPathname: PropTypes.string.isRequired,
  baseShareMessage: PropTypes.string.isRequired,
}
