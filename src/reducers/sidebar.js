import { handleActions } from 'redux-actions'
import * as actions from 'actions/sidebar'
import { sidebar as initialState } from 'initialState'

export default handleActions(
  {
    [actions.toggleSidebar]: state => ({
      ...state,
      open: true,
    }),

    [actions.closeSidebar]: state => ({
      ...state,
      open: false,
    }),

    [actions.toggleSidebar]: state => ({
      ...state,
      open: !state.open,
    }),

    [actions.toggleSidebarDocked]: (state, { payload }) => ({
      ...state,
      docked: payload.docked,
    }),
  },
  initialState,
)
