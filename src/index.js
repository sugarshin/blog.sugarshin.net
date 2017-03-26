import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import noop from 'lodash/noop'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'
import history from 'modules/history'
import APIBase from 'apis/Base'
import analytics from '../vendor/analytics'
import 'bootswatch/cosmo/bootstrap.css'
import 'highlight.js/styles/github.css'
import 'stylus/index.styl'

const main = () => {
  const production = process.env.NODE_ENV === 'production'

  if (production) analytics.load(process.env.SEGMENT_WRITE_KEY)

  APIBase.baseURI = process.env.API_BASE
  APIBase.ref = production ? 'master' : null

  const store = configureStore()
  history.listen(production ? () => analytics.page() : noop)

  const root = document.querySelector('#app-root')
  ReactDOM.render(<AppContainer><Root store={store} /></AppContainer> , root)

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NextRoot = require('./containers/Root').default
      ReactDOM.render(<AppContainer><NextRoot store={store} /></AppContainer>, root)
    })
  }
}

main()
