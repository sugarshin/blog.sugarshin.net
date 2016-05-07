import 'whatwg-fetch';
import 'sanitize.css/lib/sanitize.styl';
import gmcss from 'github-markdown-css/github-markdown.css';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.styl';

function Hello(props) {
  return <h1 className={styles.h1}>{props.name}</h1>;
}
Hello.propTypes = { name: React.PropTypes.string };

ReactDOM.render((
  <div className={gmcss['markdown-body']}>
    <Hello name='Aoi' />
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <h6>h6</h6>
    <p>ppppppppp</p>
    <ul>
      <li>ul</li>
      <li>ul</li>
      <li>ul</li>
      <li>ul</li>
    </ul>
    <ol>
      <li>ol</li>
      <li>ol</li>
      <li>ol</li>
      <li>ol</li>
    </ol>
    <blockquote>blockquoteblockquote</blockquote>
    <pre><code>codecodecodecodecode</code></pre>
  </div>
), document.querySelector('#app-root'));
