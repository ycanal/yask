import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';

import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import '!style!css!less!../stylesheets/yask.less';

import Root from 'Root';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
    <LogMonitor/>
  </DockMonitor>
);

const reducers = combineReducers({routing: routerReducer});
const enhancer = compose(applyMiddleware(thunk), DevTools.instrument());
const store = createStore(reducers, enhancer);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
  <div>
    <Root history={history}/>
    <DevTools/>
  </div>
</Provider>, document.getElementById('mount'));
