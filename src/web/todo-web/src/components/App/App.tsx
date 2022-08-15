import React from "react";
import "./App.css";
import Todo from "components/Todo/Todo";

const App = () => {
  const user = {
    name: "Shifu Meister",
  };

  return (
    <div className="App">
      <Todo username={user.name}></Todo>
    </div>
  );
};

export default App;
