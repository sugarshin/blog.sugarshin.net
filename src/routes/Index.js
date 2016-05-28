import React from 'react';
import Articles from 'components/Articles';

export default function Index(props) {
  return <Articles articles={props.articles.items} />;
}
