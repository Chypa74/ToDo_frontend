import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions/';
import { bindActionCreators } from 'redux';
import TodoCardText from '../TodoCardText';
import Input from '../Input';
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

  // componentWillReceiveProps(nextProps) {
  //   if (isEqual(nextProps.params, this.props.params)) { return; }
  //   this.setState({
  //     ...this.makeState(nextProps)
  //   });

  //   if (this._textarea) {
  //     this._textarea.blur();
  //   }
  // }

  sendChange = ({ title: nextTitle, id }) => {
    let {
      todoActions: { editTodoTitle },
      currentTodo: { title: prevTitle }
    } = this.props;
    nextTitle = nextTitle.trim();
    if (nextTitle === prevTitle) {
      return;
    }
    if (nextTitle) {
      editTodoTitle({ title: nextTitle, id: id });
    } else {
      editTodoTitle({ title: '', id: id });
    }
  };

  handleChangeTitle = event => {
    let {
      currentTodo: { id }
    } = this.props;
    let newTitle = event.target.value;
    this.setState(prevState => {
      return { ...prevState, title: newTitle };
    });
    this.sendChangeDebounced({ title: newTitle, id });
  };

  handleCloseCard = () => {
    let { history } = this.props;
    history.push('/');
  };

  render() {
    let { title } = this.state;
    let { currentTodo, editTodoText } = this.props;
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
          <TodoCardText currentTodo={currentTodo} editTodoText={editTodoText} />
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

const mapDispatchToProps = dispatch => ({
  todoActions: bindActionCreators(TodoActions, dispatch),
  editTodoText: bindActionCreators(TodoActions.editTodoText, dispatch.sync)
});

export default connect(makeMapStateToProps, mapDispatchToProps)(TodoCard);
