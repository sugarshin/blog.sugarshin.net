import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PageTitle from 'components/PageTitle';
import ArticleComponent from 'components/Article';
import ShareToolbar from 'components/ShareToolbar';
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
    const { location, article } = this.props;
    return (
      <div>
        <Helmet title={article.title} />
        <PageTitle title={article.title} />
        <ArticleComponent article={article} />
        {article.markdown ? <ShareToolbar
          message={document.title}
          url={`${global.location.origin}${location.pathname}`}
        /> : null}
        {article.markdown ? (
          <Disqus
            shortname='logsugarshinnet'
            identifier={location.pathname}
            title={article.title}
          />
        ) : null}
      </div>
    );
  }
  _fetchArticleIfNeeded(params) {
    const { year, month, day, title } = params;
    this.props.actions.fetchArticleIfNeeded(`/_articles/${year}-${month}-${day}_${title}.md`);
  }
}
