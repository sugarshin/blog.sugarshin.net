import { createStore, applyMiddleware } from 'redux'
import LogRocket from 'logrocket'
import { createRootReducer } from 'reducers'
import { createRouterMiddleware } from './middlewares/router'
import epicMiddleware from './middlewares/epic'
import analyticsMiddleware from './middlewares/analytics'
import handleLocationAndDocumentChange from './middlewares/handleLocationAndDocumentChange'

export default function configureStore({ history, initialState }) {
  const { SEGMENT_WRITE_KEY, LOGROCKET_APP_ID } = process.env
  const middlewares = [
    createRouterMiddleware(history),
    epicMiddleware(),
    ...(SEGMENT_WRITE_KEY ? [analyticsMiddleware()] : []),
    handleLocationAndDocumentChange,
    ...(LOGROCKET_APP_ID ? [LogRocket.reduxMiddleware()] : []),
  ]
  const store = createStore(
    createRootReducer({ history }),
    initialState,
    applyMiddleware(...middlewares)
  )
  return store
}
