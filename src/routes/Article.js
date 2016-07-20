import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PageTitle from 'components/PageTitle';
import ArticleComponent from 'components/Article';
import LoadingSpinner from 'components/LoadingSpinner';
import { siteName } from '../../config/settings';

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
    const { location, article } = this.props;
    return (
      <div>
        <Helmet title={article.title} />
        <PageTitle title={article.title} />
        {article.markdown ? (
          <ArticleComponent article={article} currentPathname={location.pathname} baseShareMessage={siteName} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
  _fetchArticleIfNeeded(params) {
    const { year, month, day, title } = params;
    this.props.actions.fetchArticleIfNeeded(`${year}-${month}-${day}_${title}.md`);
  }
}
