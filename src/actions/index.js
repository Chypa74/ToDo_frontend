import * as types from '../constants/ActionTypes';
import uuidv4 from 'uuid/v4';

export const addTodo = action => ({
  type: types.ADD_TODO,
  title: action.title,
  todoId: uuidv4()
});

export const deleteTodo = id => ({ type: types.DELETE_TODO, id });

export const editTodoTitle = action => ({
  type: types.EDIT_TODO_TITLE,
  id: action.id,
  title: action.title
});

export const editTodoText = action => ({
  type: types.EDIT_TODO_TEXT,
  id: action.id,
  text: action.text
});

export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });

export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });

export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });

export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
