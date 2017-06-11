import types from 'constants/ActionTypes'

export const toggleSidebar = () => {
  return {
    type: types.TOGGLE_SIDEBAR,
  }
}

export const openSidebar = () => {
  return {
    type: types.OPEN_SIDEBAR,
  }
}

export const closeSidebar = () => {
  return {
    type: types.CLOSE_SIDEBAR,
  }
}

export const toggleDocked = docked => {
  return { type: types.TOGGLE_SIDEBAR_DOCKED, docked }
}
