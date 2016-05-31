import React, { Component } from 'react';
import DisqusThread from 'react-disqus-thread';
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
    const { pathname } = this.props.location;
    return (
      <div>
        <ArticleComponent article={this.props.article} />
        {/*TODO*/}
        <div style={{ padding: 16 }}>
          <DisqusThread
            id={pathname}
            shortname='logsugarshinnet'
            identifier={pathname}
            className='disqus-thread'
            title={this.props.article.title} />
            {/*onNewComment={this.handleNewComment} />*/}
        </div>
      </div>
    );
  }
  _fetchArticleIfNeeded(params) {
    const { year, month, day, title } = params;
    this.props.actions.fetchArticleIfNeeded(`/articles/${year}-${month}-${day}_${title}.md`);
  }
}
