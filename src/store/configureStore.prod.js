import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootReducer from 'reducers';
import rootSaga from 'sagas';

export default function configureStore(initialState) {
  const saga = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, saga)
  );
  saga.run(rootSaga);
  return store;
}
