function TodoHeader(props) {
  let user = {
    name: "He Who Shall Not Be Named",
  };

  if (props.user && props.user.name) {
    user.name = props.user.name;
  }

  return <div className="todo-header">Welcome to {user.name}'s TODO list!</div>;
}

export default TodoHeader;
