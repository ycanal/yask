import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {routerReducer, syncHistoryWithStore} from 'react-router-redux';
import {hashHistory} from 'react-router';

import 'css!less!../stylesheets/yask.less';

import Root from 'Root';

const reducers = combineReducers({routing: routerReducer});
const enhancer = applyMiddleware(thunk);
const store = createStore(reducers, enhancer);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
  <Root history={history}/>
</Provider>, document.getElementById('mount'));
