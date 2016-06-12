import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from 'containers/App';
import Index from 'routes/Index';
import Article from 'routes/Article';
import Archives from 'routes/Archives';
import Tags from 'routes/Tags';
import Search from 'routes/Search';
import NotFound from 'components/NotFound'; // TODO

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Index}/>
          <Route path=':year/:month/:day/:title' component={Article}/>
          <Route path='archives/:date' component={Archives}/>
          <Route path='tags/:tag' component={Tags}/>
          <Route path='search' component={Search} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
}
