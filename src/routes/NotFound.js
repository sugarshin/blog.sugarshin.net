/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import NotFoundComponent from 'components/NotFound'

export default class NotFound extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>{`${this.props.location.pathname}`} 404 Not Found</title>
        </Helmet>
        <NotFoundComponent pathname={this.props.location.pathname} />
      </>
    )
  }
}
