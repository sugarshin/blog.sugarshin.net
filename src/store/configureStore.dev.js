import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import history from 'modules/history'
import rootReducer from 'reducers'
import rootSaga from 'sagas'
import DevTools from 'enhancers/DevTools'

export default function configureStore(initialState) {
  const saga = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        saga,
        logger
      ),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
    )
  )

  saga.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
