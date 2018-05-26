import { createStore, applyMiddleware } from 'redux'
import LogRocket from 'logrocket'
import rootReducer from 'reducers'
import routerMiddleware from './middlewares/router'
import epicMiddleware from './middlewares/epic'

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMiddleware(),
      epicMiddleware(),
      LogRocket.reduxMiddleware()
    )
  )
  return store
}
