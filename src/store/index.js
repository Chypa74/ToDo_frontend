import { applyMiddleware, compose } from 'redux';
import createLoguxCreator from 'logux-redux/create-logux-creator';

import rootReducer from '../reducers';
import createLogger from './logger';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let DEBUG = process.env.NODE_ENV !== 'production';

const logger = createLogger();

export default function configureStore(history, initialState) {
  const middleware = [routerMiddleware(history), DEBUG && logger].filter(
    Boolean
  );

  const createStore = createLoguxCreator({
    subprotocol: '1.0.0',
    server: 'ws://localhost:1337',
    userId: 10
  });

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
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
  store.client.start();
  return store;
}
