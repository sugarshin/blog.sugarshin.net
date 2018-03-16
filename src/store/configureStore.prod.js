import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import LogRocket from 'logrocket'
import history from 'modules/history'
import rootReducer from 'reducers'
import rootEpic from 'epics'

export default function configureStore(initialState) {
  const epic = createEpicMiddleware(rootEpic)
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMiddleware(history),
      epic,
      LogRocket.reduxMiddleware()
    )
  )
  return store
}
