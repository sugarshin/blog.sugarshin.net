import React from 'react';
import Octicon from 'react-octicon';
// import remarkReact from 'remark-react';
import classnames from 'classnames';
import remarkRenderer from '../../../universal/remarkRenderer';
import 'github-markdown-css';
import styles from './index.styl';

export default function Article(props) {
  // eslint-disable-next-line react/no-danger
  return props.article.markdown ? <div className={classnames('markdown-body', styles.body)} dangerouslySetInnerHTML={{
    __html: remarkRenderer.process(props.article.markdown)
  }}></div> : <Octicon spin name='sync' />;
}
// return <div className='markdown-body'>{remarkRenderer.process(props.article.markdown)}</div>;
