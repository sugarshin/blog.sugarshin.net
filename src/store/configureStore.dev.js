import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import history from 'modules/history'
import rootReducer from 'reducers'
import rootEpic from 'epics'
import DevTools from 'enhancers/DevTools'

export default function configureStore(initialState) {
  const epic = createEpicMiddleware(rootEpic)

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        epic,
        logger,
      ),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)),
    ),
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
