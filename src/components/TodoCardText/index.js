import React, { Component } from 'react';
import Textarea from '../Textarea';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import debounce from '../../functions/debounce';
import './TodoCardText.css';

class TodoCardText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.sendChangeDebounced = debounce(this.sendChange, 1000);
  }

  componentDidMount() {
    if (this.props.currentTodo) {
      let {
        currentTodo: { text }
      } = this.props;
      this.setState(prevState => {
        return {
          ...prevState,
          text
        };
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentTodo, nextProps.currentTodo)) {
      let {
        currentTodo: { text: nextText }
      } = nextProps;
      this.setState(prevState => {
        return {
          ...prevState,
          text: nextText
        };
      });
    }
  }

  sendChange = ({ newText: text, todoId }) => {
    let { editTodoText } = this.props;
    text = text.trim();
    if (text.length !== 0) {
      editTodoText({ text, todoId });
    } else {
      editTodoText({ text: '', todoId });
    }
  };

  handleChange = event => {
    let {
      currentTodo: { todoId }
    } = this.props;
    let newText = event.target.value;
    this.setState(prevState => {
      return { ...prevState, text: newText };
    });
    this.sendChangeDebounced({ newText, todoId });
  };

  render() {
    let { text } = this.state;
    return (
      <div className="TodoCardText__wrapper">
        <div className="TodoCardText__title">Описание</div>
        <Textarea
          inputRef={t => (this._textarea = t)}
          className="TodoCardText__textarea"
          onBlur={this.handleBlur}
          value={text}
          placeholder="Введите текст"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

TodoCardText.propTypes = {
  currentTodo: PropTypes.shape({
    todoId: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string
  })
};

export default TodoCardText;
