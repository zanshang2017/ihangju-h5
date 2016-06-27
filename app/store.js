/**
 * 创建redux.store，异步支持
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history = null) {

  if (!history) {
    throw new Error('need history!');
  }

  //redux config
  const middlewares = [
    sagaMiddleware, // redux-sagas
    routerMiddleware(history), //用于路由同步state
  ];

  const enhancers = [
    applyMiddleware(...middlewares), //
    devtools(),
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  // 异步reducer
  store.asyncReducers = {};
  return store;
}
