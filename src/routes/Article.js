import React, { Component } from 'react';
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
      // TODO
      <div style={{ minHeight: 'calc(100% - 40px)' }}>
        <ArticleComponent article={article} />
        {article.markdown ? <ShareToolbar message={document.title} /> : null}
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
