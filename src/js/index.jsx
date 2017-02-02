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

let devTools, enhancer, init;
if (DEVTOOLS) {
  let createDevTools, LogMonitor, DockMonitor;
  init = Promise.all([
    import('redux-devtools'),
    import('redux-devtools-log-monitor'),
    import('redux-devtools-dock-monitor')
  ]).then(results => {
    createDevTools = results[0].createDevTools;
    LogMonitor = results[1].default;
    DockMonitor = results[2].default;

    const DevTools = createDevTools(
      <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
        <LogMonitor/>
      </DockMonitor>
    );
    devTools = (<DevTools/>);

    enhancer = compose(applyMiddleware(thunk), DevTools.instrument());
  });


} else {
  init = Promise.resolve(
    enhancer = applyMiddleware(thunk)
  );
}

init.then(() => {
  const store = createStore(reducers, enhancer);
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <Provider store={store}>
    <div>
      <Root history={history}/>
      {devTools}
    </div>
  </Provider>, document.getElementById('mount'));
});
