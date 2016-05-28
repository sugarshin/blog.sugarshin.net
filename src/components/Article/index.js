import React from 'react';
import Octicon from 'react-octicon';
import remark from 'remark';
// import remarkReact from 'remark-react';
import remarkHtml from 'remark-html';
import remarkHighlightjs from 'remark-highlight.js';
import remarkSlug from 'remark-slug';
import remarkYamlConfig from 'remark-yaml-config';
import 'github-markdown-css';

const remarkRenderer = remark()
  // .use(remarkReact)
  .use(remarkHtml)
  .use(remarkHighlightjs)
  .use(remarkSlug)
  .use(remarkYamlConfig);

export default function Article(props) {
  // eslint-disable-next-line react/no-danger
  return props.article.markdown ? <div className='markdown-body' dangerouslySetInnerHTML={{
    __html: remarkRenderer.process(props.article.markdown)
  }}></div> : <Octicon spin name='sync' />;
}
// return <div className='markdown-body'>{remarkRenderer.process(props.article.markdown)}</div>;
