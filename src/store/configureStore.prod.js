import { createStore, applyMiddleware } from 'redux'
import LogRocket from 'logrocket'
import rootReducer from 'reducers'
import routerMiddleware from './middlewares/router'
import epicMiddleware from './middlewares/epic'
import analyticsMiddleware from './middlewares/analytics'
import handleLocationAndDocumentChange from './middlewares/handleLocationAndDocumentChange'

export default function configureStore(initialState) {
  const { E2E_TEST } = process.env
  const isE2E = E2E_TEST !== '0'
  const middlewares = [
    routerMiddleware(),
    epicMiddleware(),
    ...(isE2E ? [] : [analyticsMiddleware()]),
    handleLocationAndDocumentChange,
    ...(isE2E ? [] : [LogRocket.reduxMiddleware()]),
  ]
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
  return store
}
