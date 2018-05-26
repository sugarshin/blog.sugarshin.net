import { createEpicMiddleware } from 'redux-observable'
import rootEpic from 'store/epics'

const epicMiddleware = () => {
  return createEpicMiddleware(rootEpic)
}

export default epicMiddleware
