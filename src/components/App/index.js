import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MainSection from '../MainSection';
import TodoCard from '../TodoCard';
import getParams from '../../functions/getParams';
import { paths } from '../../constants/paths';
import subscribe from 'react-logux/subscribe';

class App extends Component {
  render() {
    return (
      <div>
        <h1>todos</h1>
        <Switch>
          <Route exact path="/" component={MainSection} />
          <Route
            path="/todo/:todoId"
            render={({ history, location: { pathname }, match }) => (
              <TodoCard
                params={getParams(pathname, paths)}
                match={match}
                history={history}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
