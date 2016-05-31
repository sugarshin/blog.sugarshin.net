import React, { Component, Children, PropTypes, cloneElement } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as rawActions from 'actions';
import Main from 'components/Main';

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(rawActions, dispatch)
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
      <Main {...this.props}>
        {Children.map(this.props.children, child => {
          return cloneElement(
            child,
            { ...this.props }
          );
        })}
      </Main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
