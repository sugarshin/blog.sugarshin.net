/* eslint-disable react/prop-types */

import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import Ribbon from 'react-github-fork-ribbon'
import Routes from 'routes'

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <div>
        <Ribbon color='black'>
          {process.env.NODE_ENV || 'development'}
        </Ribbon>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </div>
    </Provider>
  )
}

export default hot(module)(Root)
