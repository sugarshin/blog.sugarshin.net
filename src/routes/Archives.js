import React from 'react';
import Helmet from 'react-helmet';
import PageTitle from 'components/PageTitle';
import Articles from 'components/Articles';

export default function Archives(props) {
  const { date } = props.params;
  return (
    <div>
      <Helmet title={`${date} | Archives`} />
      <PageTitle title={`Entries from ${date}`} />
                                                        {/*TODO*/}
      <Articles articles={props.articles.archives[date] || []} />
    </div>
  );
}
