import { trackPageView } from '@redux-beacon/segment'
import types from 'constants/ActionTypes'

const eventsMap = {
  [types.LOCATION_CHANGED]: trackPageView(action => ({
    name: action.payload.pathname,
  })),
}

export default eventsMap
