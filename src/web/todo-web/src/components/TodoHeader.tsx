interface ITodoHeaderProps {
  username?: string;
}

const TodoHeader = (props: ITodoHeaderProps) => {
  // Validate the component's props.
  if (!props.username) {
    props.username = "He Who Shall Not Be Named";
  }

  return (
    <div className="todo-header">Welcome to {props.username}'s TODO list!</div>
  );
};

export default TodoHeader;
