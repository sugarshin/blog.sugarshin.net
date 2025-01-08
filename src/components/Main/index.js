/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { Alert, Button } from 'react-bootstrap'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { ThreeBarsIcon } from '@primer/octicons-react'
import SidebarMenu from 'components/SidebarMenu'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import connectStore from 'modules/connectStore'
import settings from '../../../config/settings'
import styles from './index.styl'

const Drawer = withStyles({
  paper: {
    // see './index.styl'
    minWidth: 240,
    maxWidth: 320,
    width: '36%',
    backgroundColor: '#fcfcfc',
    borderLeft: '1px solid #f3f3f3',
    padding: 16,
    '-webkit-overflow-scrolling': 'touch',
  },
})(SwipeableDrawer)

@withRouter
@connectStore()
export default class Main extends Component {
  handleChangeMediaQuery = e => this.props.actions.toggleSidebarDocked(e.matches)

  constructor(props) {
    super(props)

    this._matchMedia = window.matchMedia ? window.matchMedia('screen and (min-width: 769px)') : null
  }
  componentDidMount() {
    if (this.props.articles.items.length === 0) {
      this.props.actions.fetchArticleList()
    }
    if (this._matchMedia) {
      this._matchMedia.addListener(this.handleChangeMediaQuery)
      this.props.actions.toggleSidebarDocked(this._matchMedia.matches)
    }
  }
  componentWillUnmount() {
    if (this._matchMedia) {
      this._matchMedia.removeListener(this.handleChangeMediaQuery)
    }
  }
  render() {
    const { articles } = this.props
    if (articles.items.length > 0) {
      return this.renderContent()
    } else if (articles.error) {
      return <Alert bsStyle='danger'>{articles.error.message || 'Unknown error'}</Alert>
    }
    return <LoadingSpinner />
  }
  renderContent() {
    const { children, sidebar, actions } = this.props
    const isOpenSiderbar = sidebar.docked || sidebar.open
    const variant = sidebar.docked ? 'persistent' : 'temporary'
    return (
      <div className={styles.root}>
        <div className={styles.mainContainer}>
          <header className={styles.header}>
            <Link to='/'>{settings.siteName}</Link>
            {!sidebar.docked ? (
              <div className={styles.toggleButton}>
                <Button onClick={actions.toggleSidebar} variant='secondary'>
                  <ThreeBarsIcon />
                </Button>
              </div>
            ) : null}
          </header>
          <main className={styles.main} id='main'>
            {children}
          </main>
          <footer className={styles.footer}>
            <p>
              <small>
                <FontAwesomeIcon icon={faCopyright} />
                {' '}
                {`${new Date().getFullYear()} ${settings.copyright}`}
              </small>
            </p>
          </footer>
        </div>
        <nav className={styles.sidebar}>
          <Drawer
            anchor="right"
            open={isOpenSiderbar}
            onOpen={actions.openSidebar}
            onClose={actions.closeSidebar}
            variant={variant}
          >
            <SidebarMenu {...this.props} />
          </Drawer>
        </nav>
      </div>
    )
  }
}
