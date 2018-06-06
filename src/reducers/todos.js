import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO_TITLE,
  EDIT_TODO_TEXT,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED
} from '../constants/ActionTypes';

const initialState = [
  {
    title: 'Redux',
    text: 'Use Redux',
    completed: false,
    id: 0
  },
  {
    title: 'React',
    text: 'Use React',
    completed: false,
    id: 1
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          todoId: action.todoId,
          completed: false,
          title: action.title
        }
      ];

    case DELETE_TODO:
      return state.filter(todo => todo.todoId !== action.todoId);

    case EDIT_TODO_TITLE:
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, title: action.title } : todo
      );
    case EDIT_TODO_TEXT:
      return state.map(
        todo => (todo.id === action.id ? { ...todo, text: action.text } : todo)
      );
    case COMPLETE_TODO:
      return state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
}
