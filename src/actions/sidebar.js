import types from 'constants/ActionTypes';

export function toggleSidebar(open) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.TOGGLE_SIDEBAR_OPEN,
      open: open ? open : !getState().sidebar.open
    });
  };
}

export function toggleDocked(docked) {
  return { type: types.TOGGLE_SIDEBAR_DOCKED, docked };
}
