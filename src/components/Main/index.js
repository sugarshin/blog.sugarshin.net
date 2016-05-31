import React, { Component, Children, cloneElement } from 'react';
import Octicon from 'react-octicon';
import Button from 'react-bootstrap/lib/Button';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router';
import SidebarMenu from 'components/SidebarMenu';
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
    const { sidebar, actions, children } = this.props;
    return (
      <div>
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
            <Link to='/'>log.sugarshin.net</Link>
          </header>
          <div className={styles.toggleButton}>
            <Button onClick={() => actions.toggleSidebar()}>
              <Octicon name='three-bars' />
            </Button>
          </div>
          {Children.map(children, child => {
            return cloneElement(
              child,
              { ...this.props }
            );
          })}
          <footer className={styles.footer}>
            <p><small>{`© ${new Date().getFullYear()} sugarshin | Shingo Sato All rights reserved.`}</small></p>
          </footer>
        </Sidebar>
      </div>
    );
  }
  _handleChangeMediaQuery(ev) {
    this.props.actions.toggleDocked(ev.matches);
  }
}
