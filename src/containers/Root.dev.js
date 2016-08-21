import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Ribbon from 'react-github-fork-ribbon';
import App from 'containers/App';
import DevTools from 'containers/DevTools';
import Index from 'routes/Index';
import Article from 'routes/Article';
import Archives from 'routes/Archives';
import Tags from 'routes/Tags';
import Search from 'routes/Search';
import NotFound from 'components/NotFound'; // TODO

// https://github.com/gaearon/redux-devtools-dock-monitor/blob/master/src/actions.js#L1
const TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
let devTools;

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <div>
        <Ribbon
          color='black'
          onClick={() => devTools.liftedStore.dispatch({ type: TOGGLE_VISIBILITY })}
        >
          control + {'{h,p,m}'}
        </Ribbon>
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
        <DevTools ref={c => devTools = c} />
      </div>
    </Provider>
  );
}
