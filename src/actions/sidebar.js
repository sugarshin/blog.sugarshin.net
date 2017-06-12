import { createAction } from 'redux-actions'
import types from 'constants/ActionTypes'

export const toggleSidebar = createAction(types.TOGGLE_SIDEBAR)
export const openSidebar = createAction(types.OPEN_SIDEBAR)
export const closeSidebar = createAction(types.CLOSE_SIDEBAR)
export const toggleSidebarDocked = createAction(types.TOGGLE_SIDEBAR_DOCKED, docked => ({ docked }))
