import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import LogRocket from 'logrocket'
import rootReducer from 'reducers'
import routerMiddleware from './middlewares/router'
import epicMiddleware from './middlewares/epic'
// import DevTools from 'store/debugger/DevTools'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(),
        epicMiddleware(),
        logger,
        LogRocket.reduxMiddleware()
      )//,
      // @see https://github.com/reduxjs/redux-devtools/issues/399
      // DevTools.instrument()
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
