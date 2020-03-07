/* eslint-disable react/prop-types */

import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import Routes from 'routes'
import { Provider as UaProvider } from 'context/ua'

export default function Root({ store, history, ua }) {
  return (
    <UaProvider value={ua}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </UaProvider>
  )
}
