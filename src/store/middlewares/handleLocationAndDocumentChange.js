import { LOCATION_CHANGE } from 'connected-react-router'
import types from 'constants/ActionTypes'
import { locationChanged } from 'actions/app'

let newLocation = null

const handleLocationAndDocumentChange = store => next => action => {
  if (!action.error) {
    if (action.type === LOCATION_CHANGE) {
      newLocation = action.payload
    } else if (action.type === types.DOCUMENT_HEAD_STATE_CHANGED) {
      if (newLocation) {
        store.dispatch(locationChanged({ ...newLocation }, action.payload))
        newLocation = null
      }
    }
  }
  return next(action)
}

export default handleLocationAndDocumentChange
