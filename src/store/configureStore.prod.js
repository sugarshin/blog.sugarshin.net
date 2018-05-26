import { createStore, applyMiddleware } from 'redux'
import LogRocket from 'logrocket'
import rootReducer from 'reducers'
import routerMiddleware from './middlewares/router'
import epicMiddleware from './middlewares/epic'
import analyticsMiddleware from './middlewares/analytics'
import handleLocationAndDocumentChange from './middlewares/handleLocationAndDocumentChange'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMiddleware(),
      epicMiddleware(),
      analyticsMiddleware(),
      handleLocationAndDocumentChange,
      LogRocket.reduxMiddleware()
    )
  )
  return store
}
