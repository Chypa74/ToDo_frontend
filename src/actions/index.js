import * as types from '../constants/ActionTypes';
import uuidv4 from 'uuid/v4';

export const addTodo = action => ({
  type: types.ADD_TODO,
  title: action.title,
  todoId: uuidv4()
});

export const deleteTodo = todoId => ({ type: types.DELETE_TODO, todoId });

export const editTodoTitle = action => ({
  type: types.EDIT_TODO_TITLE,
  todoId: action.todoId,
  title: action.title
});

export const editTodoText = action => ({
  type: types.EDIT_TODO_TEXT,
  todoId: action.todoId,
  text: action.text
});

export const completeTodo = action => ({
  type: types.COMPLETE_TODO,
  todoId: action.todoId,
  completed: action.completed
});

export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });

export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });

export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
