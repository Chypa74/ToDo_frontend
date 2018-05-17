import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from './logger';
import { routerMiddleware } from 'react-router-redux';

let DEBUG = process.env.NODE_ENV !== 'production';

const logger = createLogger();

export default function configureStore(history, initialState) {
  const middleware = [routerMiddleware(history), DEBUG && logger].filter(
    Boolean
  );

  let composeEnhancers = compose;
  if (DEBUG && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers/index');
      store.replaceReducer(nextReducer);
    });

    // module.hot.accept('../sagas', () => {
    //   const getNewSagas = require('../sagas/index');
    //   store.dispatch({ type: 'SET_SAGAS', sagas: getNewSagas() });
    // });
  }

  return store;
}
