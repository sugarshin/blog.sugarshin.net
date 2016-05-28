import React from 'react';
import Articles from 'components/Articles';

export default function Archives(props) {
  const { date } = props.params;
  return <Articles articles={props.articles.archives[date]} />;
}
