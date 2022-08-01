import TodoHeader from "./TodoHeader";

function Todo(props) {
  let user = {
    name: "Shifu Meister",
  };
  const items = [
    { id: 1, title: "This is item #1.", isDone: false },
    { id: 2, title: "This is item #2.", isDone: false },
    { id: 3, title: "This is item #3.", isDone: false },
    { id: 4, title: "This is item #4.", isDone: false },
    { id: 5, title: "This is item #5.", isDone: false },
  ];

  if (props.user && props.user.name) {
    user.name = props.user.name;
  }

  const itemsList = items.map((item) => (
    <p className="todo-list-item" key={item.id.toString()}>
      {item.title}
    </p>
  ));

  return (
    <div className="todo">
      <TodoHeader user={user}></TodoHeader>
      <div className="todo-list">{itemsList}</div>
    </div>
  );
}

export default Todo;
