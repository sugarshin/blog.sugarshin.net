import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import LogRocket from 'logrocket'
import { createRootReducer } from 'reducers'
import { createRouterMiddleware } from './middlewares/router'
import epicMiddleware from './middlewares/epic'
// import DevTools from 'store/debugger/DevTools'

export default function configureStore({ history }) {
  const store = createStore(
    createRootReducer({ history }),
    compose(
      applyMiddleware(
        createRouterMiddleware(history),
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
