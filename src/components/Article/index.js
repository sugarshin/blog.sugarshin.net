import React, { Component, PropTypes } from 'react';
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

export default class Article extends Component {
  static get propTypes() {
    return {
      markdown: PropTypes.string
    };
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { year, month, day, title } = this.props.params;
    this.props.fetchArticleIfNeeded(`/articles/${year}-${month}-${day}_${title}.md`);
  }
  render() {
    // eslint-disable-next-line react/no-danger
    return this.props.article.markdown ? <div className='markdown-body' dangerouslySetInnerHTML={{
      __html: remarkRenderer.process(this.props.article.markdown)
    }}></div> : <Octicon spin name='sync' />;
  }
}
// return <div className='markdown-body'>{remarkRenderer.process(this.props.article.markdown)}</div>;
