import { createStore, applyMiddleware } from 'redux'
import LogRocket from 'logrocket'
import { createRootReducer } from 'reducers'
import { createRouterMiddleware } from './middlewares/router'
import epicMiddleware from './middlewares/epic'
import analyticsMiddleware from './middlewares/analytics'
import handleLocationAndDocumentChange from './middlewares/handleLocationAndDocumentChange'

export default function configureStore({ history }) {
  const { E2E_TEST } = process.env
  const isE2E = E2E_TEST !== '0'
  const middlewares = [
    createRouterMiddleware(history),
    epicMiddleware(),
    ...(isE2E ? [] : [analyticsMiddleware()]),
    handleLocationAndDocumentChange,
    ...(isE2E ? [] : [LogRocket.reduxMiddleware()]),
  ]
  const store = createStore(
    createRootReducer({ history }),
    applyMiddleware(...middlewares)
  )
  return store
}
