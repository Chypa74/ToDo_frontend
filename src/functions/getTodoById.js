export default (todos, id) => {
  id = parseInt(id, 10);
  let filtered = todos.filter(todo => todo.id === id);
  return filtered.length ? filtered[0] : null;
};
