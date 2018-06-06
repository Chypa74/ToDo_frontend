export default (todos, id) => {
  let filtered = todos.filter(todo => todo.todoId === id);
  return filtered.length ? filtered[0] : null;
};
