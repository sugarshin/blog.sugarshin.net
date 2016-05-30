import React from 'react';
import Articles from 'components/Articles';

export default function Archives(props) {
  const { date } = props.params;                              // TODO
  return <Articles articles={props.articles.archives[date] || []} />;
}
