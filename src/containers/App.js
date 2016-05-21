import React, { Component, Children, PropTypes, cloneElement } from 'react';
import Octicon from 'react-octicon';
import Button from 'react-bootstrap/lib/Button';
import Sidebar from 'react-sidebar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from './App.styl';

const _matchMedia = global.matchMedia ? global.matchMedia('screen and (min-width: 768px)') : null;

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch)
});

class App extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
      ])
    };
  }
  get _matchMedia() {
    return _matchMedia;
  }
  constructor(props) {
    super(props);

    this.handleChangeMediaQuery = ev => this._handleChangeMediaQuery(ev);
  }
  render() {
    return (
      <div>
        <Sidebar
          styles={{ sidebar: { minWidth: 240, maxWidth: 320, width: '36%', backgroundColor: 'indianred' }}}
          sidebar={<strong>test</strong>}
          shadow={false}
          pullRight
          open={this.props.sidebar.open}
          docked={this.props.sidebar.docked}
          onSetOpen={this.props.toggleSidebar}>
          <div className={styles.toggleButton}>
            <Button onClick={() => this.props.toggleSidebar()}>
              <Octicon name='three-bars' />
            </Button>
          </div>
          {Children.map(this.props.children, child => {
            return cloneElement(
              child,
              { ...this.props }
            );
          })}
        </Sidebar>
      </div>
    );
  }
  componentDidMount() {
    if (this._matchMedia) {
      this._matchMedia.addListener(this.handleChangeMediaQuery);
      this.props.toggleDocked(this._matchMedia.matches);
    }
  }
  componentWillUnmount() {
    if (this._matchMedia) {
      this._matchMedia.removeListener(this.handleChangeMediaQuery);
    }
  }
  _handleChangeMediaQuery(ev) {
    this.props.toggleDocked(ev.matches);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
