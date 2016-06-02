import React, { Component } from 'react';
import ArticleComponent from 'components/Article';
import Disqus from 'components/Disqus';

export default class Article extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this._fetchArticleIfNeeded(this.props.params);
  }
  componentWillReceiveProps({ params }) {
    if (this.props.params !== params) {
      this._fetchArticleIfNeeded(params);
    }
  }
  render() {
    const { pathname } = this.props.location;
    return (
      <div>
        <ArticleComponent article={this.props.article} />
        <Disqus
          shortname='logsugarshinnet'
          identifier={pathname}
          title={this.props.article.title}
        />
      </div>
    );
  }
  _fetchArticleIfNeeded(params) {
    const { year, month, day, title } = params;
    this.props.actions.fetchArticleIfNeeded(`/articles/${year}-${month}-${day}_${title}.md`);
  }
}
