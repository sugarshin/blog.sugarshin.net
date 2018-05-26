import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import history from 'modules/history'

const routerMiddleware = () => {
  return createRouterMiddleware(history)
}

export default routerMiddleware
