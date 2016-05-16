import 'whatwg-fetch';
import 'bootswatch/cosmo/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers/App';
import Articles from './components/Articles';
import Article from './components/Article';
import NotFound from './components/NotFound';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Articles}/>
        <Route path=":year/:month/:day/:title" component={Article}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.querySelector('#app-root'));
