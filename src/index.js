import 'bootswatch/dist/cosmo/bootstrap.css'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown-light.css'
import 'stylus/index.styl'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { createBrowserHistory } from 'history'
import Raven from 'raven-js'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'
import APIBase from 'apis/Base'

const main = () => {
  if (process.env.SENTRY_DSN) {
    Raven.config(
      process.env.SENTRY_DSN,
      { release: process.env.BUILD_NUMBER, debug: process.env.NODE_ENV !== 'production' }
    ).install()
  }

  APIBase.baseURI = process.env.API_BASE || ''
  APIBase.ref = process.env.BRANCH || 'master'

  const preloadedState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__

  const history = createBrowserHistory()
  const store = configureStore({ history, initialState: preloadedState })
  const root = document.querySelector('#app-root')

  window.snapSaveState = () => ({
    __PRELOADED_STATE__: store.getState(),
  })

  if (root.hasChildNodes()) {
    hydrate(<Root store={store} history={history} ua={navigator.userAgent} />, root)
  } else {
    render(<Root store={store} history={history} ua={navigator.userAgent} />, root)
  }
}

main()
