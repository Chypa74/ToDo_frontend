import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoCardText from '../TodoCardText';
import Input from '../Input';
import { isEqual } from 'lodash';
import { editTodoTitle, editTodoText } from '../../actions';
import debounce from '../../functions/debounce';
import { makeGetCurrentTodo } from '../../selectors';
import './TodoCard.css';

class TodoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };

    this.sendChangeDebounced = debounce(this.sendChange, 1000);
  }

  componentDidMount() {
    if (this.props.currentTodo) {
      let {
        currentTodo: { title }
      } = this.props;
      this.setState(prevState => {
        return {
          ...prevState,
          title
        };
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      let {
        currentTodo: { title: nextTitle }
      } = nextProps;
      this.setState(prevState => {
        return {
          ...prevState,
          title: nextTitle
        };
      });
    }
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
    console.log('render');
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
