import { useState } from "react";
import TodoHeader from "./TodoHeader";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

interface IUser {
  id: number;
  title: string;
  isDone: boolean;
}
const itemsList: IUser[] = [
  { id: 1, title: "This is item #1.", isDone: false },
  { id: 2, title: "This is item #2.", isDone: false },
  { id: 3, title: "This is item #3.", isDone: false },
  { id: 4, title: "This is item #4.", isDone: false },
  { id: 5, title: "This is item #5.", isDone: false },
];

// function getItemsLeft(items) {
const getItemsLeft = (items: IUser[]) => {
  if (!items) {
    // TODO: Log a meaningful message somewhere...
    console.log("getItemsLeft: items must be defined!");
    return;
  }
  return items.filter((item: IUser) => !item.isDone).length;
};

interface ITodoProps {
  username?: string;
}

const Todo = (props: ITodoProps) => {
  const [items, setItems] = useState(itemsList);
  const [itemsLeft, setItemsLeft] = useState(getItemsLeft(items));

  // Validate the component's props.
  if (!props.username) {
    props.username = "Shifu Meister";
  }

  // function handleChange(key) {
  const handleChange = (key: number) => {
    if (!key) {
      // TODO: Log a meaningful message somewhere...
      console.log("handleChange: key must be defined!");
      return;
    }

    const target = items.find((item) => item.id === key);

    if (target) {
      target.isDone = !target.isDone;
      setItems(items);
      setItemsLeft(getItemsLeft(items));
    } else {
      // TODO: Log a meaningful message somewhere...
      console.log(
        `handleChange: item with specified key (${key}) does not exist.`
      );
    }
  };

  const itemsComponents = items.map((item) => (
    <ListGroup.Item
      action
      className="todo-list-item"
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
                <TodoHeader username={props.username}></TodoHeader>
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
