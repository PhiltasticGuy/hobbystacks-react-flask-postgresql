function TodoHeader(props) {
  let user = {
    name: "He Who Shall Not Be Named",
  };

  if (props.user && props.user.name) {
    user.name = props.user.name;
  }

  return (
    <div className="todo-header">
      <p>Welcome to {user.name}'s TODO list!</p>
    </div>
  );
}

export default TodoHeader;