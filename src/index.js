import 'whatwg-fetch';
import 'bootswatch/cosmo/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from 'containers/App';
import Index from 'routes/Index';
import Article from 'routes/Article';
import Archives from 'routes/Archives';
import Tags from 'routes/Tags';
import NotFound from 'components/NotFound'; // TODO
import configureStore from 'store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Index}/>
        <Route path=':year/:month/:day/:title' component={Article}/>
        <Route path='archives/:date' component={Archives}/>
        <Route path='tags/:tag' component={Tags}/>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.querySelector('#app-root'));
