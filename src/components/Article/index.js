import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
// import remarkReact from 'remark-react';
import classnames from 'classnames';
import remarkRenderer from '../../../universal/remarkRenderer';
import 'github-markdown-css';
import styles from './index.styl';

// const mdRenderer = remarkRenderer.use(remarkReact);

export default function Article(props) {
  // const html = remarkRenderer.process(props.article.markdown);
  // const __html = preloadMedia(html);
  // // console.log(h);
  // const src = require('images/2016/06/05/published-oneteam-rte/oneteam-rte.gif');
  // const f = h.replace(/images\/2016\/06\/05\/published-oneteam-rte\/oneteam-rte.gif/, src);
  return props.article.markdown ? (
    // <div className={classnames('markdown-body', styles.body)}>
    //   {mdRenderer.process(props.article.markdown)}
    // </div>
    // eslint-disable-next-line react/no-danger
    <div className={classnames('markdown-body', styles.body)} dangerouslySetInnerHTML={{
      __html: remarkRenderer.process(props.article.markdown)//preloadMedia(remarkRenderer.process(props.article.markdown))
      //f//remarkRenderer.process(props.article.markdown)
    }}></div>
  ) : <LoadingSpinner />;
}

// {/*<p><img src="../images/2016/06/05/published-oneteam-rte/oneteam-rte.gif" alt="oneteam-rte.gif"></p>*/}

// function preloadMedia(htmlString) {
//   // debugger;
//   const mediaRegexp = /images\/\d{4}\/\d{2}\/\d{2}\/(\w|-)+\/(\w|-)+\.(jpe?g|png|gif|svg)/g;
//   return htmlString.replace(mediaRegexp, match => {
//     // debugger;
//     return require(match);
//   });
//   // (htmlString.match(mediaRegexp) || []).forEach(path => require(match))
// }

// '<p><img src="../images/2016/06/05/published-oneteam-rte/oneteam-rte.gif" alt="oneteam-rte.gif"></p><p><img src="../images/2016/06/05/published-oneteam-rte/oneteam-rte2.gif" alt="oneteam-rte.gif"></p><p><img src="../images/2016/06/05/published-oneteam-rte/oneteam-rte3.gif" alt="oneteam-rte.gif"></p>'.replace(/images\/\d{4}\/\d{2}\/\d{2}\/(\w|-)+\/(\w|-)+\.(jpe?g|png|gif|svg)/g, (match, ...args) => {
//   console.log(args);
//   return require(match);
// })
