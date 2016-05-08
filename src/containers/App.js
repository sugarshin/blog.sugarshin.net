import React, { Component, Children, cloneElement, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import * as actions from '../actions';

const mapStateToProps = state => {
  console.log(state);
  return { ...state };
};
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
      <div>{Children.map(this.props.children, child => {
        return cloneElement(
          child,
          { ...this.props }
        );
      })}</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
