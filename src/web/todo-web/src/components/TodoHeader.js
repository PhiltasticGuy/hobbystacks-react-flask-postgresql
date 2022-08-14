function TodoHeader({ username }) {
  // Validate the component's props.
  if (!username) {
    username = "He Who Shall Not Be Named";
  }

  return <div className="todo-header">Welcome to {username}'s TODO list!</div>;
}

export default TodoHeader;
