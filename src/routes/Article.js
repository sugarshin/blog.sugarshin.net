import React, { Component } from 'react';
import ArticleComponent from 'components/Article';

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
    return <ArticleComponent article={this.props.article} />;
  }
  _fetchArticleIfNeeded(params) {
    const { year, month, day, title } = params;
    this.props.actions.fetchArticleIfNeeded(`/articles/${year}-${month}-${day}_${title}.md`);
  }
}
