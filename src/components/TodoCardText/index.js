import React, { Component } from 'react';
import Textarea from '../Textarea';
import PropTypes from 'prop-types';
import debounce from '../../functions/debounce';
import './TodoCardText.css';

class TodoCardText extends Component {
  constructor(props) {
    super(props);
    let {
      currentTodo: { text = '' }
    } = props;
    this.state = {
      text: text
    };
    this.sendChangeDebounced = debounce(this.sendChange, 1000);
  }

  sendChange = ({ text: nextText, id }) => {
    let {
      editTodoText,
      currentTodo: { text: prevText }
    } = this.props;
    nextText = nextText.trim();
    if (nextText === prevText) {
      return;
    }
    if (nextText) {
      editTodoText({ text: nextText, id });
    } else {
      editTodoText({ text: '', id });
    }
  };

  handleChange = event => {
    let {
      currentTodo: { id }
    } = this.props;
    let newText = event.target.value;
    this.setState(prevState => {
      return { ...prevState, text: newText };
    });
    this.sendChangeDebounced({ text: newText, id });
  };

  render() {
    let { text } = this.state;
    console.log(this.props);
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

TodoCardText.propTypes = {};

export default TodoCardText;
