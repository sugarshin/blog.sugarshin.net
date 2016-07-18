import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import classnames from 'classnames';
import markdownRenderer from '../../../universal/markdownRenderer';
import 'github-markdown-css';
import styles from './index.styl';

export default function Article(props) {
  return props.article.markdown ? (
    // eslint-disable-next-line react/no-danger
    <div className={classnames('markdown-body', styles.body)} dangerouslySetInnerHTML={{
      __html: markdownRenderer.process(props.article.markdown).contents
    }}></div>
  ) : <LoadingSpinner />;
}
