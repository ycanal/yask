import React, {Component} from 'react';
const host = BASE_URL;

class Page extends Component {
  render() {
    return (
      <p className="lead">
        Rendering page at {`${host}${this.props.location.pathname}`}
      </p>
    );
  }
}
Page.propTypes = {
  location: React.PropTypes.object.isRequired
};

export default Page;
