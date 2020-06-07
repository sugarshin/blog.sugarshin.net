import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import LogRocket from 'logrocket'
import { createRootReducer } from 'reducers'
import { createRouterMiddleware } from './middlewares/router'
import { createThunkMiddleware } from './middlewares/thunk'
// import DevTools from 'store/debugger/DevTools'

export default function configureStore({ history, initialState }) {
  const store = createStore(
    createRootReducer({ history }),
    initialState,
    compose(
      applyMiddleware(
        createThunkMiddleware(),
        createRouterMiddleware(history),
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
