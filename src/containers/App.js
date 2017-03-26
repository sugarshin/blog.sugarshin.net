import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import Main from 'components/Main'

export default class App extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
      ])
    }
  }
  render() {
    return (
      <Main>
        <Helmet
          titleTemplate='%s | log.sugarshin.net'
          defaultTitle='log.sugarshin.net'
        />
        {this.props.children}
      </Main>
    )
  }
}
