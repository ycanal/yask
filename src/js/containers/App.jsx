import React, {Component} from 'react';
import {Link} from 'react-router';

let NavItem = (props) => (
  <li>
    <Link {...props} activeClassName="active"/>
  </li>
);

class NavBar extends Component {
  componentDidMount() {
    let adjust_body_offset = () => {
      document.body.style['padding-top'] = `${this.refs.navbar.offsetHeight}px`;
    };

    window.onresize = adjust_body_offset;
    adjust_body_offset();
  }

  render() {
    return (
      <nav ref='navbar' className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to='/'>YASK</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <NavItem to="/page1">Page 1</NavItem>
              <NavItem to="/page2">Page 2</NavItem>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

let Footer = () => (
  <footer className="navbar navbar-inverse navbar-fixed-bottom">
    <div className="container">
      <p className="navbar-text pull-left">
        <a href="http://www.freepik.com/free-photos-vectors/logo">Logo vector designed by Patrickss - Freepik.com</a>
      </p>
    </div>
  </footer>
);

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="app-body">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
