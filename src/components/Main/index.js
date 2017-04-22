/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import Sidebar from 'react-sidebar'
import { Link, withRouter } from 'react-router-dom'
import Icon from 'react-fa'
import SidebarMenu from 'components/SidebarMenu'
import LoadingSpinner from 'components/utils/LoadingSpinner'
import Octicon from 'components/utils/Octicon'
import connectStore from 'modules/connectStore'
import settings from '../../../config/settings'
import styles from './index.styl'

@withRouter
@connectStore()
export default class Main extends Component {
  constructor(props) {
    super(props)

    //                              TODO: move to this.props
    //                                                      ＼
    this._matchMedia = window.matchMedia ? window.matchMedia('screen and (min-width: 769px)') : null
    this.handleChangeMediaQuery = ev => this.props.actions.toggleDocked(ev.matches)
  }
  componentDidMount() {
    this.props.actions.fetchArticleList()
    if (this._matchMedia) {
      this._matchMedia.addListener(this.handleChangeMediaQuery)
      this.props.actions.toggleDocked(this._matchMedia.matches)
    }
  }
  componentWillUnmount() {
    if (this._matchMedia) {
      this._matchMedia.removeListener(this.handleChangeMediaQuery)
    }
  }
  render() {
    const { children, sidebar, articles, actions } = this.props
    return articles.items.length > 0 ? (
      <Sidebar
        rootClassName={styles.root}
        sidebarClassName={styles.sidebar}
        contentClassName={styles.content}
        sidebar={<SidebarMenu {...this.props} />}
        shadow={false}
        pullRight
        open={sidebar.open}
        docked={sidebar.docked}
        onSetOpen={actions.toggleSidebar}
      >
        <header className={styles.header}>
          <Link to='/'>{settings.siteName}</Link>
          {!sidebar.docked ? (
            <div className={styles.toggleButton}>
              <Button onClick={actions.toggleSidebar}>
                <Octicon name='three-bars' />
              </Button>
            </div>
          ) : null}
        </header>
        <main className={styles.main}>
          {children}
        </main>
        <footer className={styles.footer}>
          <p>
            <small>
              <Icon name='copyright' />
              {' '}
              {`${new Date().getFullYear()} ${settings.copyright}`}
            </small>
          </p>
        </footer>
      </Sidebar>
    ) : (
      <LoadingSpinner />
    )
  }
}
