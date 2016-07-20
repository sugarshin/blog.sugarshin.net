import React, { PropTypes } from 'react';
import ArticleBody from 'components/ArticleBody';
import ShareToolbar from 'components/ShareToolbar';
import Disqus from 'components/Disqus';

const propTypes = {
  // article:
  currentPathname: PropTypes.string.isRequired,
  baseShareMessage: PropTypes.string.isRequired
};

export default function Article({ article, currentPathname, baseShareMessage }) {
  return (
    <div>
      <ArticleBody markdown={article.markdown} />
      <ShareToolbar
        message={`${article.title} | ${baseShareMessage}`}
        url={`${global.location.origin}${currentPathname}`}
      />
      <Disqus
        shortname='logsugarshinnet'
        identifier={currentPathname}
        title={article.title}
      />
    </div>
  );
}

Article.propTypes = propTypes;
