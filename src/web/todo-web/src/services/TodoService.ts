import ITodoItem from "objects/ITodoItem";
import ITodoService from "./ITodoService";

class TodoService implements ITodoService {
  private _itemsList: ITodoItem[] = [
    { id: 1, title: "This is item #1.", isDone: false },
    { id: 2, title: "This is item #2.", isDone: false },
    { id: 3, title: "This is item #3.", isDone: false },
    { id: 4, title: "This is item #4.", isDone: false },
    { id: 5, title: "This is item #5.", isDone: false },
  ];

  public async addItem(item: ITodoItem): Promise<boolean> {
    console.log("TodoService.addItem()");
    await new Promise((r) => setTimeout(r, 500));
    const count = this._itemsList.length + 1;
    return this._itemsList.push(item) === count;
  }

  public async getItems(): Promise<ITodoItem[]> {
    console.log("TodoService.getItems()");
    await new Promise((r) => setTimeout(r, 500));
    return this._itemsList;
  }
}

export default TodoService;
