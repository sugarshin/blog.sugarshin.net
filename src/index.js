import 'whatwg-fetch';
import 'bootswatch/cosmo/bootstrap.css'
import 'highlight.js/styles/github.css'
import 'stylus/index.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'store/configureStore';
import APIBase from 'apis/Base';
import analytics from '../vendor/analytics';

const main = () => {
  const production = process.env.NODE_ENV === 'production';

  if (production) analytics.load(process.env.SEGMENT_WRITE_KEY);

  APIBase.baseURI = process.env.API_BASE;
  APIBase.ref = production ? 'master' : null;

  const store = configureStore();
  const history = syncHistoryWithStore(browserHistory, store);
  const historyListener = production ? () => analytics.page() : () => {};
  history.listen(historyListener);

  ReactDOM.render(<Root store={store} history={history} />, document.querySelector('#app-root'));
}

main();
