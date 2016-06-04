import React from 'react';
import Articles from 'components/Articles';

export default function Tags(props) {
  const { tag } = props.params;
  const articles = props.articles.items.filter(item => item.tags.includes(tag.replace(/_/g, ' ')));
  return <Articles articles={articles} />;
}
