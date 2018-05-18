import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

class TodoItem extends Component {
  state = {
    editing: false
  };

  handleDoubleClick = () => {
    let {
      history,
      todo: { id }
    } = this.props;
    history.push(`/todo/${id}`);
  };

  // handleSave = (id, text) => {
  //   let { todoActions: { deleteTodo} } = this.props;
  //   if (text.length === 0) {
  //     deleteTodo(id);
  //   } else {
  //     this.props.editTodo(id, text);
  //   }
  //   this.setState({ editing: false });
  // };

  render() {
    const {
      todo,
      todoActions: { completeTodo, deleteTodo }
    } = this.props;
    let element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={this.handleDoubleClick}>{todo.title}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
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
  todo: PropTypes.object.isRequired,
  todoActions: PropTypes.object.isRequired
};

export default withRouter(TodoItem);
