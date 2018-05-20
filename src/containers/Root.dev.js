/* eslint-disable react/prop-types */

import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Ribbon from 'react-github-fork-ribbon'
import Routes from 'routes'
import history from 'modules/history'
// import DevTools from 'store/debugger/DevTools'

// // https://github.com/gaearon/redux-devtools-dock-monitor/blob/master/src/actions.js#L1
// const TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY'
// let devTools

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <div>
        <Ribbon
          color='black'
          // onClick={() => devTools.liftedStore.dispatch({ type: TOGGLE_VISIBILITY })}
        >
          control + {'{h,p,m}'}
        </Ribbon>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
        {/* @see https://github.com/reduxjs/redux-devtools/issues/399 */}
        {/* <DevTools ref={c => devTools = c} /> */}
      </div>
    </Provider>
  )
}

export default hot(module)(Root)
