import React, { Component, Children, cloneElement } from 'react';
import Octicon from 'react-octicon';
import Button from 'react-bootstrap/lib/Button';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router';
import SidebarMenu from 'components/SidebarMenu';
import LoadingSpinner from 'components/LoadingSpinner';
import settings from '../../../config/settings';
import styles from './index.styl';

const _matchMedia = global.matchMedia ? global.matchMedia('screen and (min-width: 769px)') : null;

export default class Main extends Component {
  get _matchMedia() {
    return _matchMedia;
  }
  constructor(props) {
    super(props);
    this.handleChangeMediaQuery = ev => this._handleChangeMediaQuery(ev);
  }
  componentDidMount() {
    this.props.actions.fetchArticlesIfNeeded();
    if (this._matchMedia) {
      this._matchMedia.addListener(this.handleChangeMediaQuery);
      this.props.actions.toggleDocked(this._matchMedia.matches);
    }
  }
  componentWillUnmount() {
    if (this._matchMedia) {
      this._matchMedia.removeListener(this.handleChangeMediaQuery);
    }
  }
  render() {
    const { sidebar, actions, children, articles } = this.props;
    return (
      <div>{articles.items.length > 0 ? (
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
                <Button onClick={() => actions.toggleSidebar()}>
                  <Octicon name='three-bars' />
                </Button>
              </div>
            ) : null}
          </header>
          {Children.map(children, child => {
            return cloneElement(
              child,
              { ...this.props }
            );
          })}
          <footer className={styles.footer}>
            <p><small>{`© ${new Date().getFullYear()} ${settings.footerLicense}`}</small></p>
          </footer>
        </Sidebar>
      ) : (
        <LoadingSpinner />
      )}
      </div>
    );
  }
  _handleChangeMediaQuery(ev) {
    this.props.actions.toggleDocked(ev.matches);
  }
}
