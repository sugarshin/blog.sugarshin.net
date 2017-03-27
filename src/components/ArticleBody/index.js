import React from 'react';
import classnames from 'classnames';
import markdownRenderer from '../../../universal/markdownRenderer';
import 'github-markdown-css/github-markdown.css';
import styles from './index.styl';

export default function ArticleBody({ markdown }) {
  return (
    // eslint-disable-next-line react/no-danger
    <div className={classnames('markdown-body', styles.body)} dangerouslySetInnerHTML={{
      __html: markdownRenderer.processSync(markdown).toString()
    }}></div>
  );
}
