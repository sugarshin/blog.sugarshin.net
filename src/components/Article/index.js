import React, { Component, PropTypes } from 'react';
import remark from 'remark';
import remarkReact from 'remark-react';
import remarkHighlight from 'remark-highlight.js';
// import remarkHtml from 'remark-html';
import remarkSlug from 'remark-slug';
import remarkYamlConfig from 'remark-yaml-config';

const remarkRenderer = remark()
  .use(remarkReact)
  .use(remarkHighlight)
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
    this.props.fetchArticleIfNeeded('/articles/2016-05-08_title1.md');
  }
  render() {
    return <div>{remarkRenderer.process(this.props.article.markdown)}</div>;
  }
}
