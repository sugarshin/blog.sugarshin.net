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

APIBase.baseURI = process.env.API_BASE;
APIBase.ref = process.env.NODE_ENV === 'production' ? 'master' : null;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Root store={store} history={history} />, document.querySelector('#app-root'));
