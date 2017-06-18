import * as actions from 'actions/sidebar'
import types from 'constants/ActionTypes'

describe('sidebar actions suite', () => {
  it('toggleSidebar', () => {
    expect(actions.toggleSidebar()).toMatchObject({
      type: types.TOGGLE_SIDEBAR,
    })
  })
  it('openSidebar', () => {
    expect(actions.openSidebar()).toMatchObject({
      type: types.OPEN_SIDEBAR,
    })
  })
  it('closeSidebar', () => {
    expect(actions.closeSidebar()).toMatchObject({
      type: types.CLOSE_SIDEBAR,
    })
  })
  it('toggleSidebarDocked', () => {
    expect(actions.toggleSidebarDocked(true)).toMatchObject({
      type: types.TOGGLE_SIDEBAR_DOCKED,
      payload: { docked: true },
    })
  })
})
