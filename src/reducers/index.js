import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  router
});

export default rootReducer;
