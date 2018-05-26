import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Main from 'components/Main'
import { documentHeadStateChanged } from 'actions/app'

const App = ({ children, onChangeClientState }) => {
  return (
    <Main>
      <Helmet
        titleTemplate='%s | blog.sugarshin.net'
        defaultTitle='blog.sugarshin.net'
        onChangeClientState={onChangeClientState}
      />
      {children}
    </Main>
  )
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  onChangeClientState: PropTypes.func.isRequired,
}

export default connect(
  null,
  dispatch => bindActionCreators({ onChangeClientState: documentHeadStateChanged }, dispatch)
)(App)
