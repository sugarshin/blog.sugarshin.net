import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
// import remarkReact from 'remark-react';
import classnames from 'classnames';
import remarkRenderer from '../../../universal/remarkRenderer';
import 'github-markdown-css';
import styles from './index.styl';

// const mdRenderer = remarkRenderer.use(remarkReact);

export default function Article(props) {
  return props.article.markdown ? (
    // <div className={classnames('markdown-body', styles.body)}>
    //   {mdRenderer.process(props.article.markdown)}
    // </div>
    // eslint-disable-next-line react/no-danger
    <div className={classnames('markdown-body', styles.body)} dangerouslySetInnerHTML={{
      __html: remarkRenderer.process(props.article.markdown)
    }}></div>
  ) : <LoadingSpinner />;
}
