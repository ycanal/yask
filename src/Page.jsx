import React, { Component } from 'react';

export default class Page extends Component {
  render() {
    return (
      <p className="lead">
        Rendering page at { this.props.location.pathname }
      </p>
    );
  }
};
