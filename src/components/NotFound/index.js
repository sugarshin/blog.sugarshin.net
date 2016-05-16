import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>404 Not Found <Link to='/'>Top</Link></div>;
  }
}
