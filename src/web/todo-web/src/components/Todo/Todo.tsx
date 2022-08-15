import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import TodoHeader from "components/TodoHeader/TodoHeader";
import ITodoItem from "objects/ITodoItem";
import ITodoService from "services/ITodoService";
// import useGetTodoItems, { IGetTodoItemsResult } from "hooks/useGetTodoItems";

const getItemsLeft = (items: ITodoItem[]) => {
  if (!items) {
    // TODO: Log a meaningful message somewhere...
    console.error("getItemsLeft: items must be defined!");
    return -1;
  }

  const itemsLeft = items.filter((item: ITodoItem) => !item.isDone);

  return itemsLeft.length ?? -1;
};

interface ITodoProps {
  todoService: ITodoService;
  username?: string;
}

const Todo = (props: ITodoProps) => {
  // const todoItems: IGetTodoItemsResult = useGetTodoItems(todoService);
  // const items = todoItems.data;

  const [items, setItems] = useState<ITodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsLeft, setItemsLeft] = useState(0);

  const fetchData = useCallback(async () => {
    const data = await props.todoService.getItems();
    const itemsLeft = getItemsLeft(data);

    setItems(data);
    setItemsLeft(itemsLeft);
    setIsLoading(false);
  }, []);

  const handleChange = (key: number) => {
    if (!key) {
      // TODO: Log a meaningful message somewhere...
      console.error("handleChange: key must be defined!");
      return;
    }

    const target = items.find((item) => item.id === key);

    if (target) {
      target.isDone = !target.isDone;
      setItemsLeft(getItemsLeft(items));
    } else {
      // TODO: Log a meaningful message somewhere...
      console.error(
        `handleChange: item with specified key (${key}) does not exist.`
      );
    }
  };

  const addItem = async () => {
    // TODO: Better logic to determine the next ID.
    const nextId = items.length + 1;
    const isSuccess = await props.todoService.addItem({
      id: nextId,
      title: "Hello World!",
      isDone: false,
    });

    if (isSuccess) {
      await fetchData();
    }
  };

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, [isLoading, fetchData]);

  // Validate the component's props.
  if (!props.username) {
    props.username = "Shifu Meister";
  }

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

      <Button variant="primary" onClick={addItem}>
        Add Item
      </Button>
    </div>
  );
};

export default Todo;
