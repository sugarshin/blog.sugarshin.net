import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Html from './Html'

export default params => '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
  <Html {...params} />
)
