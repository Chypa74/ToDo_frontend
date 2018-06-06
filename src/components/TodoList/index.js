import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as TodoActions from '../../actions';
import TodoItem from '../TodoItem';
import { getVisibleTodos } from '../../selectors';

const TodoList = ({ filteredTodos, todoActions }) => (
  <ul className="todo-list">
    {filteredTodos.map(todo => (
      <TodoItem key={todo.todoId} todo={todo} todoActions={todoActions} />
    ))}
  </ul>
);

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      todoId: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  todoActions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state)
});

const mapDispatchToProps = dispatch => ({
  todoActions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
