import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { deleteTodo, completeTodo } from '../../actions';
import { withRouter } from 'react-router-dom';

class TodoItem extends Component {
  state = {
    editing: false
  };

  handleDoubleClick = () => {
    let {
      history,
      todo: { todoId }
    } = this.props;
    history.push(`/todo/${todoId}`);
  };

  handleCompleteTodo(todo) {
    let { dispatch } = this.props;
    let { todoId, completed: prevCompletedValue } = todo;
    dispatch.sync(completeTodo({ todoId, completed: !prevCompletedValue }), {
      reasons: ['completeTodo']
    });
  }

  render() {
    let { todo, dispatch } = this.props;
    let element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleCompleteTodo.bind(this, todo)}
        />
        <label onClick={this.handleDoubleClick}>{todo.title}</label>
        <button
          className="destroy"
          onClick={() =>
            dispatch.sync(deleteTodo(todo.todoId), {
              reasons: ['deleteTodo']
            })
          }
        />
      </div>
    );

    return (
      <li
        className={classnames({
          completed: todo.completed
        })}
      >
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default withRouter(connect()(TodoItem));
