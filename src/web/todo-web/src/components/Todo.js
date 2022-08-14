import { useState } from "react";
import TodoHeader from "./TodoHeader";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

const itemsList = [
  { id: 1, title: "This is item #1.", isDone: false },
  { id: 2, title: "This is item #2.", isDone: false },
  { id: 3, title: "This is item #3.", isDone: false },
  { id: 4, title: "This is item #4.", isDone: false },
  { id: 5, title: "This is item #5.", isDone: false },
];

// function Todo(props) {
// const Todo = (props) => {
const Todo = ({ username }) => {
  const [items, setItems] = useState(itemsList);
  const [itemsLeft, setItemsLeft] = useState(getItemsLeft(items));

  // Validate the component's props.
  // let username = "Shifu Meister";
  // if (props.username) {
  //   username = props.username;
  // }
  if (!username) {
    username = "Shifu Meister";
  }

  function handleChange(key) {
    const target = items.find((item) => item.id === key);
    // console.log(`${key} - ${target.isDone}`);
    target.isDone = !target.isDone;
    setItems(items);
    setItemsLeft(getItemsLeft(items));
  }

  function getItemsLeft(items) {
    return items.filter((item) => !item.isDone).length;
  }

  const itemsComponents = items.map((item) => (
    // <p className="todo-list-item" key={item.id.toString()}>
    //   {item.title}
    // </p>
    <ListGroup.Item
      action
      key={item.id.toString()}
      onClick={() => handleChange(item.id)}
    >
      {/* {" "}
      <Form.Check
        type="checkbox"
        id={item.id.toString()}
        label={item.title}
        onChange={() => handleChange(item.id)}
        checked={item.isDone}
      /> */}
      <div>
        {item.title}
        {item.isDone ? " - DONE!" : ""}
      </div>
    </ListGroup.Item>
  ));

  return (
    <div className="todo">
      <Container>
        <Row>
          <Col />
          <Col xs="6">
            <Card>
              <Card.Header>
                <TodoHeader username={username}></TodoHeader>
              </Card.Header>
              {/* <Card.Body> */}
              {/* <Card.Title>Special title treatment</Card.Title> */}
              <ListGroup variant="flush">{itemsComponents}</ListGroup>
              {/* <div className="todo-list">{itemsComponents}</div> */}
              {/* </Card.Body>11 */}
              <Card.Footer>{itemsLeft} items left!</Card.Footer>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>

      <Button variant="primary">Go somewhere</Button>
    </div>
  );
};

export default Todo;
