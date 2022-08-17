import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./App.css";
import Todo from "components/Todo/Todo";
import MemoryTodoService from "services/TodoService";

// TODO: TodoService could be a Singleton.
const todoService = new MemoryTodoService();

const App = () => {
  const user = {
    name: "Shifu Meister",
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col />
          <Col xs="6">
            <Todo todoService={todoService} username={user.name}></Todo>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

export default App;
