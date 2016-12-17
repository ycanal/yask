import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './layout/App';
import Page from './Page';

const store = createStore(
  combineReducers({
    routing: routerReducer,
  })
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Page}/>
        <Route path="/page1" component={Page}/>
        <Route path="/page2" component={Page}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
);
