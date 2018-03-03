import 'bootswatch/cosmo/bootstrap.css'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import 'octicons/build/build.css'
import 'stylus/index.styl'
import React from 'react'
import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import noop from 'lodash/noop'
import Root from 'containers/Root'
import configureStore from 'store/configureStore'
import history from 'modules/history'
import APIBase from 'apis/Base'
import analytics from '../vendor/analytics'

const main = () => {
  if (process.env.SENTRY_DSN) {
    Raven.config(
      process.env.SENTRY_DSN,
      { release: process.env.BUILD_NUMBER, debug: process.env.NODE_ENV !== 'production' }
    ).install()
  }

  APIBase.baseURI = process.env.API_BASE
  APIBase.ref = process.env.NODE_ENV === 'production' ? 'master' : null

  if (process.env.SEGMENT_WRITE_KEY) {
    analytics.load(process.env.SEGMENT_WRITE_KEY)
    analytics.page()
  }
  history.listen(process.env.SEGMENT_WRITE_KEY ? () => (window.analytics || analytics).page() : noop)

  const store = configureStore()
  const root = document.querySelector('#app-root')
  ReactDOM.render(<Root store={store} />, root)
}

main()
