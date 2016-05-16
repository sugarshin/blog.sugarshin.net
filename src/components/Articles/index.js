import React, { Component } from 'react';
import { Link } from 'react-router';

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
        const [year, month, day] = item.date.split(' ')[0].split('-');
        return <div key={i}><Link to={`/${year}/${month}/${day}/${item.url}`}>{item.title}</Link></div>;
      })}</div>
    );
  }
}
