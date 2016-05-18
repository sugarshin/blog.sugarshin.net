import React, { Component, Children, cloneElement, PropTypes } from 'react';
import Octicon from 'react-octicon';
import Button from 'react-bootstrap/lib/Button';
import Sidebar from 'react-sidebar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Sidebar
          styles={{ sidebar: { width: 300, backgroundColor: '#fff' }}}
          sidebar={<strong>test</strong>}
          shadow={false}
          pullRight
          open={this.props.sidebar.open}
  //          docked={this.state.sidebarDocked}
          onSetOpen={this.props.toggleSidebar}>
          <Button onClick={() => this.props.toggleSidebar()}>
            <Octicon name='three-bars' />
          </Button>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
