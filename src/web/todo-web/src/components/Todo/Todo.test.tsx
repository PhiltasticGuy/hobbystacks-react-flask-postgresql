import { render, screen, waitFor, within } from "@testing-library/react";
import ITodoItem from "objects/ITodoItem";
import ITodoService from "services/ITodoService";
import Todo from "./Todo";

describe("Todo", () => {
  it("renders no items initially", async () => {
    // Arrange
    const username = "Shifu Meister";
    const todoService: ITodoService = {
      getItems: jest.fn(() => Promise.resolve([] as ITodoItem[])),
      addItem: jest.fn((item: ITodoItem) => Promise.resolve(false)),
    };
    const headerText = /Welcome to .* TODO list!/i;
    const footerText = /.* items left!/i;

    // Act
    render(<Todo todoService={todoService} username={username}></Todo>);

    // Assert: TodoService
    await waitFor(() => expect(todoService.getItems).toBeCalled(), {
      timeout: 1000,
    });
    // expect(todoService.getItems).toBeCalled();

    // Assert: Header
    const header = screen.getByRole("heading", { name: headerText });
    expect(header).not.toBeNull();
    expect(header).toBeInTheDocument();

    // Assert: Items
    const todoItems = screen.getByRole("list");
    expect(within(todoItems).queryByRole("listitem")).not.toBeInTheDocument();

    // Assert: Footer
    const footer = screen.getByText(footerText);
    expect(footer).not.toBeNull();
    expect(footer).toBeInTheDocument();
  });

  it("renders single item", async () => {
    // Arrange
    const username = "Shifu Meister";
    const item = { id: 1, title: "Hello World", isDone: false };
    const items: ITodoItem[] = [item];
    const todoService: ITodoService = {
      getItems: jest.fn(() => Promise.resolve(items)),
      addItem: jest.fn((item: ITodoItem) => Promise.resolve(false)),
    };
    const headerText = /Welcome to .* TODO list!/i;
    const footerText = /.* items left!/i;

    // Act
    render(<Todo todoService={todoService} username={username}></Todo>);

    // Assert: TodoService
    expect(todoService.getItems).toBeCalled();

    // Assert: Header
    const header = screen.getByText(headerText);
    expect(header).not.toBeNull();
    expect(header).toBeInTheDocument();

    // Assert: Items
    const todoList = screen.getByRole("list");
    const todoItems = await within(todoList).findAllByRole("listitem", {
      name: item.title,
    });
    expect(todoItems).toHaveLength(1);

    // Assert: Footer
    const footer = screen.getByText(footerText);
    expect(footer).not.toBeNull();
    expect(footer).toBeInTheDocument();
  });

  it("renders newly created item", async () => {
    // Arrange
    const username = "Shifu Meister";
    const item = { id: 1, title: "Hello World", isDone: false };
    const items: ITodoItem[] = [];
    const todoService: ITodoService = {
      getItems: jest.fn(() => Promise.resolve(items)),
      addItem: jest.fn((item: ITodoItem) => {
        items.push(item);
        return Promise.resolve(true);
      }),
    };
    const headerText = /Welcome to .* TODO list!/i;
    const footerText = /.* items left!/i;

    // Act
    render(<Todo todoService={todoService} username={username}></Todo>);

    // Assert: TodoService
    expect(todoService.getItems).toBeCalled();

    // Assert: Header
    const header = screen.getByText(headerText);
    expect(header).not.toBeNull();
    expect(header).toBeInTheDocument();

    // Assert: Items
    const todoList = screen.getByRole("list");
    expect(within(todoList).queryByRole("listitem")).not.toBeInTheDocument();

    // Assert: Footer
    const footer = screen.getByText(footerText);
    expect(footer).not.toBeNull();
    expect(footer).toBeInTheDocument();

    // Act: Add Item
    const addButton = screen.getByRole("button", { name: "Add Item" });
    addButton.click();

    // Assert: Item Rendered
    const todoItems = await within(todoList).findAllByRole("listitem", {
      name: item.title,
    });
    expect(todoItems).toHaveLength(1);
  });
});
