import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import history from 'modules/history'
import rootReducer from 'reducers'
import rootSaga from 'sagas'

export default function configureStore(initialState) {
  const saga = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      saga
    )
  )
  saga.run(rootSaga)
  return store
}
