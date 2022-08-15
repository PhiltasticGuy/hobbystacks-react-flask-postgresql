import React from "react";
import "./App.css";
import Todo from "components/Todo/Todo";
import TodoService from "services/TodoService";

// TODO: TodoService could be a Singleton.
const todoService = new TodoService();

const App = () => {
  const user = {
    name: "Shifu Meister",
  };

  return (
    <div className="App">
      <Todo todoService={todoService} username={user.name}></Todo>
    </div>
  );
};

export default App;
