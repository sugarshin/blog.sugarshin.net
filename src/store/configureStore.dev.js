import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import LogRocket from 'logrocket'
import history from 'modules/history'
import rootReducer from 'reducers'
import rootEpic from 'store/epics'
// import DevTools from 'store/debugger/DevTools'

export default function configureStore(initialState) {
  const epic = createEpicMiddleware(rootEpic)

  const enhancer = compose(
    applyMiddleware(
      routerMiddleware(history),
      epic,
      logger,
      LogRocket.reduxMiddleware()
    )//,
    // @see https://github.com/reduxjs/redux-devtools/issues/399
    // DevTools.instrument()
  )

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
