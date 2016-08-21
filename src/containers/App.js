import React, { Component, Children, PropTypes, cloneElement } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from 'components/Main';
import * as rawActions from 'actions';

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(rawActions, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
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
    const { children, ...props } = this.props;
    return (
      <Main {...props}>
        <Helmet
          titleTemplate='%s | log.sugarshin.net'
          defaultTitle='log.sugarshin.net'
        />
        {Children.map(children, child => cloneElement(child, { ...props }))}
      </Main>
    );
  }
}
