import 'whatwg-fetch';
import 'bootswatch/cosmo/bootstrap.css'
// import 'bootswatch/superhero/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import Articles from './components/Articles';
import Article from './components/Article';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <App>
      <Articles />
      <Article />
    </App>
  </Provider>
), document.querySelector('#app-root'));
