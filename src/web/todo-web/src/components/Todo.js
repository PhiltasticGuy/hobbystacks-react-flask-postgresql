import TodoHeader from "./TodoHeader";

function Todo(props) {
  let user = {
    name: "Shifu Meister",
  };

  if (props.user && props.user.name) {
    user.name = props.user.name;
  }

  return (
    <div className="Todo">
      <TodoHeader user={user}></TodoHeader>
    </div>
  );
}

export default Todo;
