import { createMiddleware } from 'redux-beacon'
import Segment from '@redux-beacon/segment'
// NOTE: enable this if you need check tracking on development, you can logging
// import logger from '@redux-beacon/logger'
import eventsMap from './eventsMap'

const segment = Segment()

const analyticsMiddleware = () => {
  return createMiddleware(eventsMap, segment/*, { logger }*/)
}

export default analyticsMiddleware
