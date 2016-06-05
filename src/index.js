import 'whatwg-fetch';
import 'bootswatch/cosmo/bootstrap.css'
import 'highlight.js/styles/github.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Root store={store} history={history} />, document.querySelector('#app-root'));
