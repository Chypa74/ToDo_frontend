import React, { Component } from 'react';
import Textarea from '../Textarea';
import PropTypes from 'prop-types';
import './TodoCardText.css';

class TodoCardText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }

  handleChange = event => {
    let newText = event.target.value;
    console.log(newText);
    this.setState(prevState => {
      return { ...prevState, text: newText };
    });
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

TodoCardText.propTypes = {};

export default TodoCardText;
