import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

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
  username: string | null;
}

const Todo = (props: ITodoProps) => {
  // const todoItems: IGetTodoItemsResult = useGetTodoItems(todoService);
  // const items = todoItems.data;

  const [items, setItems] = useState<ITodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsLeft, setItemsLeft] = useState(0);

  const fetchData = useCallback(async () => {
    const data: ITodoItem[] = await props.todoService.getItems();

    const itemsLeft = getItemsLeft(data);

    setItems(data);
    setItemsLeft(itemsLeft);
    setIsLoading(false);
  }, [props.todoService]);

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
  let username = "Shifu Meister";
  if (props.username) {
    username = props.username;
  }

  const itemsComponents = items.map((item) => (
    <ListGroup.Item
      action
      as="li"
      className="todo-list-item"
      aria-labelledby={`todo-list-item[${item.id}]`}
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
      {/* <div>
        {item.title}
        {item.isDone ? " - DONE!" : ""}
      </div> */}
      <div id={`todo-list-item[${item.id}]`}>
        {item.title}
        {item.isDone ? " - DONE!" : ""}
      </div>
    </ListGroup.Item>
  ));

  return (
    <div id="todo">
      <Card>
        <Card.Header>
          <TodoHeader username={username}></TodoHeader>
        </Card.Header>
        {/* <Card.Body> */}
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <ListGroup as="ul" variant="flush">
          {itemsComponents}
        </ListGroup>
        {/* <div className="todo-list">{itemsComponents}</div> */}
        {/* </Card.Body>11 */}
        <Card.Footer>{itemsLeft} items left!</Card.Footer>
      </Card>

      <Button variant="primary" onClick={addItem}>
        Add Item
      </Button>
    </div>
  );
};

export default Todo;
