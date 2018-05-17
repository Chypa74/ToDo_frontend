import React from 'react';
import ReactDOM from 'react-dom';

import './css/default.css';
import 'todomvc-app-css/index.css';

import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';
import Root from './Root';

const history = createHistory({ basename: '/' });

ReactDOM.render(<Root history={history} />, document.getElementById('root'));

registerServiceWorker();
