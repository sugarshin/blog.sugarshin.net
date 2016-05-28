import React from 'react';
import { Link } from 'react-router';

export default function Articles(props) {
  return (
    <div>{props.articles.map((article, i) => {
      const [year, month, day] = article.date.split(' ')[0].split('-');
      return <div key={i}><Link to={`/${year}/${month}/${day}/${article.url}`}>{article.title}</Link></div>;
    })}</div>
  );
}
