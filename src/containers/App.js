import React from 'react'
import Helmet from 'react-helmet'
import ScrollMemory from 'react-router-scroll-memory'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Main from 'components/Main'
import { documentHeadStateChanged } from 'actions/app'
import { protocol, domain, siteName, description } from '../../config/settings'

const App = ({ children, onChangeClientState }) => {
  return (
    <Main>
      <Helmet
        titleTemplate={`%s | ${siteName}`}
        defaultTitle={siteName}
        onChangeClientState={onChangeClientState}
      >
        <meta name='title' content={siteName} />
        <meta name='description' content={description} />
        <meta property='og:title' content={siteName} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={`${protocol}//${domain}/assets/images/common/open-graph.jpg`} />
        <meta property='og:url' content={`${protocol}//${domain}/`} />
      </Helmet>
      <ScrollMemory elementID={Main.mainContentId} />
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
