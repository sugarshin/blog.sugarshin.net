import React, { Component } from 'react';

export default class Articles extends Component {
  // static get propTypes() {
  //   return {
  //     articles: PropTypes.array
  //   };
  // }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchArticlesIfNeeded();
  }
  render() {
    console.log('Articles', this.props);
    return (
      <div>{this.props.articles.items.map((item, i) => {
        return <div key={i}>{item.title}</div>;
      })}</div>
    );
  }
}
