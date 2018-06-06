import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';
import { getVisibleTodos } from '../../selectors';

const TodoList = ({ filteredTodos }) => (
  <ul className="todo-list">
    {filteredTodos.map(todo => <TodoItem key={todo.todoId} todo={todo} />)}
  </ul>
);

TodoList.propTypes = {
  filteredTodos: PropTypes.arrayOf(
    PropTypes.shape({
      todoId: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = state => ({
  filteredTodos: getVisibleTodos(state)
});

export default connect(mapStateToProps)(TodoList);
