import TodoHeader from "./TodoHeader";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

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
      <Container>
        <Row>
          <Col />
          <Col xs="6">
            <Card>
              <Card.Header>
                <TodoHeader user={user}></TodoHeader>
              </Card.Header>
              {/* <Card.Body> */}
              {/* <Card.Title>Special title treatment</Card.Title> */}
              <ListGroup variant="flush">
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
              </ListGroup>
              {/* <div className="todo-list">{itemsList}</div> */}
              {/* </Card.Body>11 */}
              <Card.Footer>2 days ago</Card.Footer>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>

      <Button variant="primary">Go somewhere</Button>
    </div>
  );
}

export default Todo;
