import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import '../stylesheets/yask.less';

import Root from 'Root';

const reducers = combineReducers({routing: routerReducer});

let devTools, enhancer;
if (DEVTOOLS) {
  /*global require:true*/
  const createDevTools = require('redux-devtools').createDevTools;
  const LogMonitor = require('redux-devtools-log-monitor').default;
  const DockMonitor = require('redux-devtools-dock-monitor').default;

  const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
      <LogMonitor/>
    </DockMonitor>
  );
  devTools = (<DevTools/>);

  enhancer = compose(applyMiddleware(thunk), DevTools.instrument());
} else {
  enhancer = applyMiddleware(thunk);
}

const store = createStore(reducers, enhancer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
  <div>
    <Root history={history}/>
    {devTools}
  </div>
</Provider>, document.getElementById('mount'));
