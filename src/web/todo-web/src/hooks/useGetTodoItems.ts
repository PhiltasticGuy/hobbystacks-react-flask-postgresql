import { useEffect, useState } from "react";
import ITodoItem from "objects/ITodoItem";
import ITodoService from "services/ITodoService";

export interface IGetTodoItemsResult {
  isLoading: boolean;
  data: ITodoItem[];
}

const useGetTodoItems = (todoService: ITodoService): IGetTodoItemsResult => {
  const [items, setItems] = useState<ITodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      // console.log("useGetTodoItems.getItems()");
      const itemsData = await todoService.getItems();
      setItems(itemsData);
      setIsLoading(false);
    };

    console.log(`useGetTodoItems.useEffect(): isLoading === ${isLoading}`);

    if (isLoading) {
      getItems();
    }
  }, [isLoading, todoService]);

  return { isLoading: isLoading, data: items };
};

export default useGetTodoItems;
