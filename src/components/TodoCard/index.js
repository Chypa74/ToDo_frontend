import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions/';
import { bindActionCreators } from 'redux';
import TodoCardText from '../TodoCardText';
import isEqual from 'lodash/isEqual';
import Input from '../Input';
import debounce from '../../functions/debounce';
import { makeGetCurrentTodo } from '../../selectors';
import './TodoCard.css';

class TodoCard extends Component {
  constructor(props) {
    super(props);
    let {
      currentTodo: { text }
    } = props;
    this.state = {
      title: text
    };

    this.sendChangeDebounced = debounce(this.sendChange, 1000);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (isEqual(nextProps.params, this.props.params)) { return; }
  //   this.setState({
  //     ...this.makeState(nextProps)
  //   });

  //   if (this._textarea) {
  //     this._textarea.blur();
  //   }
  // }

  sendChange = ({ text, id }) => {
    let {
      todoActions: { editTodo },
      currentTodo: { text: prevText }
    } = this.props;
    text = text.trim();
    if (text === prevText) {
      return;
    }
    if (text) {
      editTodo({ text: text, id: id });
    } else {
      editTodo({ text: '', id: id });
    }
  };

  handleChangeTitle = event => {
    let {
      currentTodo: { id }
    } = this.props;
    let newTitle = event.target.value;
    console.log(newTitle);
    this.setState(prevState => {
      return { ...prevState, title: newTitle };
    });
    this.sendChangeDebounced({ text: newTitle, id });
  };

  render() {
    let { title } = this.state;
    console.log(this.props);
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
        <div className="TodoCard__workspace">
          <TodoCardText text={title ? title : ''} />
        </div>
      </div>
    );
  }
}

function makeMapStateToProps() {
  const getCurrentTodo = makeGetCurrentTodo();
  const mapStateToProps = (state, props) => {
    return {
      todos: state.todos,
      currentTodo: getCurrentTodo(state, props)
    };
  };
  return mapStateToProps;
}

const mapDispatchToProps = dispatch => ({
  todoActions: bindActionCreators(TodoActions, dispatch)
});

export default connect(makeMapStateToProps, mapDispatchToProps)(TodoCard);
