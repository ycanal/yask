import React, { Component } from 'react';

class Page extends Component {
  render() {
    return (
      <p className="lead">
        Rendering page at { this.props.location.pathname }
      </p>
    );
  }
}
Page.propTypes = {
  location: React.PropTypes.node.isRequired
};
export default Page;
