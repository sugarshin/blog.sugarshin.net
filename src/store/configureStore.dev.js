import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import DevTools from 'containers/DevTools';
import rootReducer from 'reducers';
import rootSaga from 'sagas';

export default function configureStore(initialState) {
  const saga = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, saga, createLogger()),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
    )
  );

  saga.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
