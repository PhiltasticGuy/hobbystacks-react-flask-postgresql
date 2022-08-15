import ITodoItem from "objects/ITodoItem";

interface ITodoService {
  getItems(): Promise<ITodoItem[]>;
}

export default ITodoService;
