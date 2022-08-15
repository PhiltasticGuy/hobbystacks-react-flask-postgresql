import ITodoItem from "objects/ITodoItem";

interface ITodoService {
  getItems(): Promise<ITodoItem[]>;
  addItem(item: ITodoItem): Promise<boolean>;
}

export default ITodoService;
