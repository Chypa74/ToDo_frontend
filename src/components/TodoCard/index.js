import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoCardText from '../TodoCardText';
import Input from '../Input';
import { editTodoTitle, editTodoText } from '../../actions';
import debounce from '../../functions/debounce';
import { makeGetCurrentTodo } from '../../selectors';
import './TodoCard.css';

class TodoCard extends Component {
  constructor(props) {
    super(props);
    let {
      currentTodo: { title }
    } = props;
    this.state = { title: title };

    this.sendChangeDebounced = debounce(this.sendChange, 1000);
  }

  sendChange = ({ newTitle: title, todoId }) => {
    let { dispatch } = this.props;
    let {
      currentTodo: { title: prevTitle }
    } = this.props;
    title = title.trim();
    if (title.length !== 0) {
      dispatch.sync(editTodoTitle({ title, todoId }), {
        reasons: ['editTodoTitle']
      });
    }
  };

  handleChangeTitle = event => {
    let {
      currentTodo: { todoId }
    } = this.props;
    let newTitle = event.target.value;
    this.setState(prevState => {
      return { ...prevState, title: newTitle };
    });
    this.sendChangeDebounced({ newTitle, todoId });
  };

  handleCloseCard = () => {
    let { history } = this.props;
    history.push('/');
  };

  render() {
    let { title } = this.state;
    let { currentTodo, dispatch } = this.props;
    return (
      <div className="main TodoCard__block">
        <div className="TodoCard__title">
          <Input
            className="TodoCard__title-text"
            value={title}
            placeholder="Todo title"
            onChange={this.handleChangeTitle}
          />
        </div>
        <div className="TodoCard__exit-icon" onClick={this.handleCloseCard} />
        <div className="TodoCard__workspace">
          <TodoCardText
            currentTodo={currentTodo}
            editTodoText={action =>
              dispatch.sync(editTodoText(action), { reasons: ['editTodoText'] })
            }
          />
        </div>
      </div>
    );
  }
}

function makeMapStateToProps() {
  const getCurrentTodo = makeGetCurrentTodo();
  const mapStateToProps = (state, props) => {
    return {
      currentTodo: getCurrentTodo(state, props)
    };
  };
  return mapStateToProps;
}

export default connect(makeMapStateToProps)(TodoCard);
