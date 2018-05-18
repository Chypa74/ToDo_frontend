import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './components/App';
import configureStore from './store';
import { hot } from 'react-hot-loader';

class Root extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore(props.history);
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.props.history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(Root);
