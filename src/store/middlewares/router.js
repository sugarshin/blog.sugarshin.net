import { routerMiddleware } from 'connected-react-router'

export function createRouterMiddleware(history) {
  return routerMiddleware(history)
}
