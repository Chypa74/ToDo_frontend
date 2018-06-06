import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import { connect } from 'react-redux';
import TodoTextInput from '../TodoTextInput';
import * as TodoActions from '../../actions';
import { addTodo } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { getCompletedTodoCount } from '../../selectors';
import TodoList from '../TodoList';

const MainSection = ({ todosCount, completedCount, actions, addTodo }) => (
  <Fragment>
    <header className="header">
      <TodoTextInput
        newTodo
        onSave={action => {
          addTodo(action);
        }}
        placeholder="What needs to be done?"
      />
    </header>
    <section className="main">
      {todosCount ? (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
          />
          <label onClick={actions.completeAllTodos} />
        </span>
      ) : null}
      <TodoList />
      {todosCount ? (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
        />
      ) : null}
    </section>
  </Fragment>
);

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
  addTodo: action => dispatch.sync(addTodo(action), { reasons: ['newTodo'] })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);
