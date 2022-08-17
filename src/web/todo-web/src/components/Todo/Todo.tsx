import { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

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
  username: string;
}

const Todo = (props: ITodoProps) => {
  // const todoItems: IGetTodoItemsResult = useGetTodoItems(todoService);
  // const items = todoItems.data;

  const [items, setItems] = useState<ITodoItem[]>([]);
  const [itemsLeft, setItemsLeft] = useState(0);

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
      title: "Hello World",
      isDone: false,
    });

    if (isSuccess) {
      await fetchData();
    }
  };

  const isSubscribed = useRef(false);

  const fetchData = useCallback(async () => {
    const data: ITodoItem[] = await props.todoService.getItems();

    if (isSubscribed.current) {
      const itemsLeft = getItemsLeft(data);

      setItems(data);
      setItemsLeft(itemsLeft);
    }
  }, [props.todoService]);

  useEffect(() => {
    isSubscribed.current = true;

    fetchData().catch(console.error);

    return () => {
      isSubscribed.current = false;
    };
  }, [fetchData]);

  // Validate the component's props.
  let username = "Shifu Meister";
  if (props.username) {
    username = props.username;
  }

  const itemsComponents = items.map((item) => {
    const itemHtmlId = `todo-list-item[${item.id}]`;
    return (
      <ListGroup.Item
        action
        as="li"
        className="todo-list-item"
        aria-labelledby={itemHtmlId}
        key={item.id.toString()}
        onClick={() => handleChange(item.id)}
      >
        <div id={itemHtmlId}>
          {item.title}
          {item.isDone ? " - DONE" : ""}
        </div>
      </ListGroup.Item>
    );
  });

  return (
    <>
      <Card id="todo">
        <Card.Header as="h2">Welcome to {username}'s TODO list!</Card.Header>
        <ListGroup as="ul" variant="flush">
          {itemsComponents}
        </ListGroup>
        <Card.Footer>{itemsLeft} items left!</Card.Footer>
      </Card>

      <Button variant="primary" onClick={addItem}>
        Add Item
      </Button>
    </>
  );
};

export default Todo;
