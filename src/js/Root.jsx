import React, {Component} from 'react';
import {IndexRoute, Router, Route} from 'react-router';

import App from 'layout/App';
import Page from 'Page';

class Root extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRoute component={Page}/>
          <Route path="/page1" component={Page}/>
          <Route path="/page2" component={Page}/>
        </Route>
      </Router>
    );
  }
}
Root.propTypes = {
  history: React.PropTypes.object.isRequired
};

export default Root;
